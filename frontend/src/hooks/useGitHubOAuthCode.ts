import qs from 'qs';
import { useEffect, useState } from 'react';

export const useGitHubOAuthCode = () => {
  const [code, setCode] = useState<string>();
  useEffect(() => {
    if (!code) {
      setCode(qs.parse(window.location.search).code?.toString());
    }
  }, [window.location.search]);
  return code;
};
