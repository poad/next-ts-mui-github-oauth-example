import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GraphQLError } from 'graphql';
import { GraphQLClient, gql } from 'graphql-request';

const GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID as string;
const GITHUB_OAUTH_CLIENT_SECRET = process.env
  .GITHUB_OAUTH_CLIENT_SECRET as string;

const QUERY = gql`
  query {
    viewer {
      databaseId
    }
  }
`;

type AccessTokenResponse = {
  access_token: string;
  scope: string;
  token_type: string;
};

type GraphQLResponse =
  | {
      viewer: {
        databaseId: number;
      };
    }
  | GraphQLError;

const client = new GraphQLClient('https://api.github.com/graphql');

const accessToken = async (code: string): Promise<AccessTokenResponse> => {
  const queryString = new URLSearchParams([
    ['client_id', GITHUB_OAUTH_CLIENT_ID],
    ['client_secret', GITHUB_OAUTH_CLIENT_SECRET],
    ['code', code],
  ]);
  const response = await fetch(
    `https://github.com/login/oauth/access_token?${queryString.toString()}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  return response.json() as Promise<AccessTokenResponse>;
};

const graphqlRequest = async (token: string): Promise<GraphQLResponse> =>
  client.request<GraphQLResponse>(
    QUERY,
    {},
    {
      authorization: `token ${token}`,
    },
  );

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  if (event.body) {
    const code = new URLSearchParams(event.body).get('code');
    if (code) {
      const tokenResp = await accessToken(code);
      const token = tokenResp.access_token;
      if (!token) {
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            message: 'Can not get access token.',
          }),
        };
      }

      const response = await graphqlRequest(token);
      if (response instanceof GraphQLError) {
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(response),
        };
      }
      const { databaseId } = response.viewer;
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          databaseId,
        }),
      };
    }
  }
  return {
    statusCode: 404,
    body: '',
  };
};
