// src/hooks/useCookie.js
// import { useState, useEffect } from 'react';
// import { parseCookies } from 'nookies';

// const useCookie = (cookieName) => {
//   const [cookieValue, setCookieValue] = useState(() => {
//     const cookies = parseCookies();
//     return cookies[cookieName];
//   });

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const cookies = parseCookies();
//       setCookieValue(cookies[cookieName]);
//     }, 1000); // checks every 1 second

//     return () => clearInterval(intervalId);
//   }, [cookieName]);

//   return cookieValue;
// };

// export default useCookie;
