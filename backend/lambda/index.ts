import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Client, gql, cacheExchange, fetchExchange } from '@urql/core';

const GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID ?? '';
const GITHUB_OAUTH_CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET ?? '';

const QUERY = gql`
  query {
    viewer {
      databaseId
    }
  }
`;

interface AccessTokenResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

interface GraphQLResponse {
  viewer: {
    databaseId: number;
  };
}

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

const graphqlRequest = async (token: string) => {
  const client = new Client({
    url: 'https://api.github.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      };
    },
  });

  return await client.query<GraphQLResponse, object>(QUERY, {}).toPromise();
};

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
      if (response.error) {
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(response.error),
        };
      }
      const { databaseId } = response.data?.viewer ?? {};
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
