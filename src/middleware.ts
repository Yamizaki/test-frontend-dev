export async function onRequest(context: any, next: any) {

  if (context.url.pathname == '/login' || context.url.pathname == '/api/login') {
    return next();
  }

  let isLoggedIn = false;

  const jwt = context.cookies.get('auth_token')


  if (!jwt) {
    isLoggedIn = false
  } else {
    try {
      const response = await fetch('https://test-frontend-dev.onrender.com/api/modulos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt.value}`
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        context.locals.cursosApi = responseData;
        isLoggedIn = true;
      } else {
        console.log("Verificación fallida:");
      }
    } catch (error) {
      console.error("Error verificando token:", error);
    }
  }

  if (!isLoggedIn) {
    return next(new Request(`${context.url.origin}/login`, {
      headers: {
        "x-redirect-to": context.url.pathname
      }
    }));
  } else {
    return next();
  }
};