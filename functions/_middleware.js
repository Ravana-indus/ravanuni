// Middleware function to ensure correct MIME types for JavaScript files
export async function onRequest({ request, next }) {
  // Clone the request
  const response = await next();
  
  // Get the URL and pathname
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Create a new response with the correct Content-Type header
  if (pathname.endsWith('.js') || pathname.endsWith('.mjs')) {
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Content-Type', 'application/javascript');
    return newResponse;
  }
  
  // Return the original response for other file types
  return response;
}
