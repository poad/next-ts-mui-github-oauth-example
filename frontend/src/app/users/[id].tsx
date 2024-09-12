'use client';

import styles from '../../styles/Home.module.css';
import Link from '@mui/material/Link';
import { usePathname, useParams, useSearchParams } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return {
    title: `${id} - Users`,
  };
}

export default function User() {
  const { params } = useParams();
  const pathname = usePathname();
  const query = useSearchParams();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>Your ID is {params}</div>
        <div>
          <div className={styles.grid}>Pathname:{pathname}</div>
          <div className={styles.grid}>Query: {JSON.stringify(query)}</div>
        </div>
        <div className={styles.grid}>
          <Link href="/">TOP</Link>
        </div>
      </main>
    </>
  );
}
