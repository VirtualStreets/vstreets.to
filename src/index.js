const websiteUrl = 'https://virtualstreets.org';
const redirect = (url) => new Response(`
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${url}">
  <script>location.replace("${url}");</script>
</head>
<body style="margin:0;padding:0;background:#fff;"></body>
</html>
`, {
  headers: { 'Content-Type': 'text/html' },
  status: 200,
});

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const slug = pathname.substring(1).toLowerCase();

    if (!slug) {
      return redirect(websiteUrl);
    }
    try {
      const value = await env.vstreets.get(slug);
      return value ? redirect(value) : redirect(websiteUrl);
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  },
};