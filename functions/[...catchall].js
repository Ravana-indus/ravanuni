export async function onRequest(context) {
  // Get the URL of the request
  const url = new URL(context.request.url);
  
  // Get the Accept header to determine if this is a browser request
  const accept = context.request.headers.get('Accept') || '';
  const isHtmlRequest = accept.includes('text/html');
  
  // If this is a browser request for HTML content, serve the index.html
  if (isHtmlRequest) {
    // Create a new request for the root index.html
    const newRequest = new Request(`${url.origin}/index.html`, context.request);
    
    // Pass the request through to Cloudflare Pages
    return context.env.ASSETS.fetch(newRequest);
  }
  
  // For non-HTML requests (like API calls or static assets), return a 404
  return new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' }
  });
} 