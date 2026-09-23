import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
<<<<<<< HEAD
 * Client-side navigation keeps the previous scroll offset, which makes a new
 * page look like it opened halfway down. Reset to the top on every route change
 * (but leave in-page hash links alone).
=======
 * Resets scroll position on route change, and honours in-page #anchors
 * (used by the article table of contents).
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
<<<<<<< HEAD
    if (hash) return;
=======
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
