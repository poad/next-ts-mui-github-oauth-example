'use client';
import Head from 'next/head';
import GitHubSignInButton from '../component/GitHubSignInButton';
import styles from './styles/Home.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useGitHubOAuthCode } from '../hooks/useGitHubOAuthCode';
import Link from 'next/link';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

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
      body: `code=${encodeURIComponent(code)}`,
    });
  }, []);

  useEffect(() => {
    if (code && !databaseId) {
      fetcher(code).then((response) =>
        response.json().then((json) => setDatabaseId(json.databaseId)),
      );
    }
  }, [code]);

  return (
    <>
      <Head>
        <title>Users</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
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
        <div className='grid'>
          <Link href='/'>TOP</Link>
        </div>
      </main>
    </>
  );
}