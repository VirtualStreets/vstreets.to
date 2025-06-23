const redirect = (url) => new Response(null, { status: 301, headers: { 'Location': url } });
const website_redirect = redirect('https://virtualstreets.org');

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const slug = pathname.substring(1);
    if (!slug) {
      return website_redirect;
    }
    try {
      const value = await env.vstreets.get(slug.toLowerCase());
      return value ? redirect(value) : website_redirect;
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  },
};