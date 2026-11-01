export function decodeFragment(hash) {
  try {
    return hash ? decodeURIComponent(hash.slice(1)) || null : null;
  } catch {
    // An invalid percent escape in a shared URL must not unmount the page.
    return null;
  }
}
