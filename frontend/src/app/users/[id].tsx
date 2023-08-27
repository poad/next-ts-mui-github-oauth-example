'use client';

import styles from '../../styles/Home.module.css';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return {
    title: `${id} - Users`,
  };
}

export default function User() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>Your ID is {id}</div>
        <div>
          <div className={styles.grid}>Route: {router.route}</div>
          <div className={styles.grid}>Pathname:{router.pathname}</div>
          <div className={styles.grid}>asPath: {router.asPath}</div>
          <div className={styles.grid}>
            Query: {JSON.stringify(router.query)}
          </div>
        </div>
        <div className={styles.grid}>
          <Link href="/">TOP</Link>
        </div>
      </main>
    </>
  );
}
