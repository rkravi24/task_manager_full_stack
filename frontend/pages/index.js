
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/register'); //Redirect to login on page load
  }, []);

  return null; // don't show anything on /
}
