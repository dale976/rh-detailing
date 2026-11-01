function safeUrl(value, media = false) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port)
      return null;
    const host = url.hostname;
    const allowed = media
      ? ['behold.pictures', 'cdninstagram.com', 'fbcdn.net'].some(
          (domain) => host === domain || host.endsWith(`.${domain}`),
        )
      : ['instagram.com', 'www.instagram.com'].includes(host) &&
        /^\/(p|reel|tv)\//.test(url.pathname);
    return allowed ? url.href : null;
  } catch {
    return null;
  }
}

export function normalizePosts(data) {
  if (!Array.isArray(data?.posts)) return [];
  return data.posts
    .flatMap((post) => {
      if (!post || typeof post !== 'object') return [];
      const href = safeUrl(post.permalink);
      const image = [
        post.sizes?.medium?.mediaUrl,
        post.sizes?.small?.mediaUrl,
        post.thumbnailUrl,
        ...(post.mediaType !== 'VIDEO' ? [post.mediaUrl] : []),
      ]
        .map((url) => safeUrl(url, true))
        .find(Boolean);
      if (!href || !image) return [];
      return [
        {
          id: String(post.id || href),
          href,
          image,
          type: post.mediaType,
          caption: typeof post.caption === 'string' ? post.caption : '',
          alt:
            typeof post.altText === 'string'
              ? post.altText.slice(0, 500)
              : 'Recent detailing work from RH Detailing on Instagram',
        },
      ];
    })
    .slice(0, 6);
}

export async function loadInstagramPosts(
  feedId,
  { fetchImpl = fetch, signal } = {},
) {
  if (!/^[A-Za-z0-9_-]{5,80}$/.test(feedId))
    throw new Error('Invalid Instagram feed ID');
  const response = await fetchImpl(`https://feeds.behold.so/${feedId}`, {
    signal,
  });
  if (!response.ok) throw new Error('Instagram feed unavailable');
  return normalizePosts(await response.json());
}
