const ENQUIRY_CONTEXT_KEY = 'rmi:enquiry-context';

/**
 * Publishes the product a visitor is currently looking at, so every contact CTA
 * on the page — including the global navbar and floating buttons — attaches it
 * to the enquiry. Returns a cleanup function; product pages call it on unmount
 * so the context does not leak onto unrelated pages.
 */
export function setEnquiryContext(context) {
  try {
    sessionStorage.setItem(ENQUIRY_CONTEXT_KEY, JSON.stringify(context));
  } catch {
    /* private mode — enquiries still work, just without product context */
  }
  return clearEnquiryContext;
}

export function clearEnquiryContext() {
  try {
    sessionStorage.removeItem(ENQUIRY_CONTEXT_KEY);
  } catch {
    /* ignore */
  }
}

export function readEnquiryContext() {
  try {
    const raw = sessionStorage.getItem(ENQUIRY_CONTEXT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * The contact form (#contact-us) only exists on the homepage, so calling
 * scrollIntoView from any other route used to throw on a null element and the
 * button did nothing. Navigate home first, then scroll once the section mounts.
 */
export function scrollToContact(navigate, pathname = window.location.pathname, context = null) {
  /*
   * Stash what the visitor was looking at so the contact form can attach
   * product context to the enquiry instead of recording an anonymous message.
   *
   * A null context is NOT treated as "clear". Product pages publish their
   * context for the whole page via setEnquiryContext(), so a global CTA such as
   * the navbar button — which knows nothing about the product — must leave that
   * in place rather than wiping it.
   */
  if (context) setEnquiryContext(context);

  const section = document.getElementById('contact-us');

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (pathname !== '/') navigate('/');
  // Give the homepage a frame or two to mount before scrolling.
  setTimeout(() => {
    document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}
