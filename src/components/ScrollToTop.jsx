import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Client-side navigation keeps the previous scroll offset, which makes a new
 * page look like it opened halfway down. Reset to the top on every route change
 * (but leave in-page hash links alone).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
