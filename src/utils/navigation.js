/**
 * The contact form (#contact-us) only exists on the homepage, so calling
 * scrollIntoView from any other route used to throw on a null element and the
 * button did nothing. Navigate home first, then scroll once the section mounts.
 */
export function scrollToContact(navigate, pathname = window.location.pathname) {
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
