'use client';

import { useCallback, useEffect, useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import GitHubSignInButton from '../component/GitHubSignInButton';
import { useGitHubOAuthCode } from '../hooks/useGitHubOAuthCode';
import './page.css';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata: Metadata = {
  title: 'Users',
};

export default function Users() {
  const code = useGitHubOAuthCode();
  const [databaseId, setDatabaseId] = useState<number>();

  const fetcher = useCallback(async (code: string) => {
    return await fetch(NEXT_PUBLIC_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams([['code', code]]).toString(),
    });
  }, []);

  useEffect(() => {
    if (code && !databaseId) {
      fetcher(code).then((response) =>
        response.json().then((json) => setDatabaseId(json.databaseId)),
      );
    }
  }, [code, databaseId, fetcher]);

  return (
    <>
      <main className=".main">
        <div className=".description">
          {!(code || databaseId) ? (
            <GitHubSignInButton />
          ) : !databaseId ? (
            'loading...'
          ) : (
            <>
              Your databaseId:{' '}
              <Link href={`/users/${databaseId}`}>{databaseId}</Link>
            </>
          )}
        </div>
        <div className="grid">
          <Link href="/">TOP</Link>
        </div>
      </main>
    </>
  );
}
