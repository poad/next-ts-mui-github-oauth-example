import { useEffect, useState } from 'react';

export const useGitHubOAuthCode = () => {
  const [code, setCode] = useState<string>();
  useEffect(() => {
    if (!code) {
      setCode(
        new URLSearchParams(window.location.search).get('code')?.toString(),
      );
    }
  }, [code]);
  return code;
};
