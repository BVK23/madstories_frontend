// src/utils/withAuth.js
// import { parseCookies, setCookie, destroyCookie } from 'nookies';

// const withAuth = (WrappedComponent) => {
//   return async (context) => {
//     const cookies = parseCookies(context);
//     let accessToken = cookies['access_token'];
//     let refreshToken = cookies['refresh_token'];
//     console.log("Access Token from new logic", accessToken);
//     console.log("Refersh Token from new logic",refreshToken);
//     // If no access token, redirect to login page
//     if(!accessToken){ 
//         return { redirect: { destination: '/login', permanent: false } };
//     }

//     // Logic to refresh the token if expired
//     if (accessTokenExpired(accessToken) && refreshToken) {
//       // Call your API to refresh the token
//       const refreshResponse = await fetch(process.env.NEXT_REFRESH_TOKEN_API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refresh: cookies['refresh_token'] }),
//       });
//       console.log("refershing acces token " );
      
//       if (refreshResponse.ok) {
//         destroyCookie(context, 'access_token');
//         const refreshData = await refreshResponse.json();
//         accessToken = refreshData.access;
//         //becasue we have set 'ROTATE_REFRESH_TOKENS': True,
//         refreshToken = refreshData.access;
//         console.log("refershing sucess " );
//         if (process.env.NEXT_PUBLIC==='http://localhost:8000'){
//         setCookie(context, 'access_token', accessToken,  { path: '/'});
//         // setCookie(context, 'refresh_token', accessToken, { path: '/'});
//         }else {
//         setCookie(context, 'access_token', accessToken,  { path: '/', domain: '.madstories.xyz', secure: true, sameSite: 'None'});
//         // setCookie(context, 'refresh_token', accessToken, { path: '/', domain: '.madstories.xyz', secure: true, sameSite: 'None'});
//         }
//         }else {
//         // Refresh token is invalid or expired
//         destroyCookie(context, 'access_token');
//         destroyCookie(context, 'refresh_token');
//         return { redirect: { destination: '/login?message=session-expired', permanent: false } };
//         }
//     }    
//     let componentProps = {};
//     if (WrappedComponent.getInitialProps) {
//       componentProps = await WrappedComponent.getInitialProps(context);
//     }

//     // Debugging logs
//     console.log("Access Token:", accessToken);
//     console.log("Component Props:", componentProps);

//     return {
//       props: { accessToken, ...componentProps },
//     };

      
    
//   };
// };

// // Helper functions for token validation and refresh
// function accessTokenExpired(token) {
//     if (!token) return true;

//     try {
//       const payloadBase64 = token.split('.')[1];
//       const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
//       const payload = JSON.parse(decodedJson);
//       const exp = payload.exp;
//       const now = Math.floor(Date.now() / 1000);
  
//       return now >= exp;
//     } catch (e) {
//       console.error('Error decoding token:', e);
//       return true;
//     } 
// }



export default withAuth;
