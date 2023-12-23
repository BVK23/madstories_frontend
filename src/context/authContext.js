// // src/context/authContext.js
// import React, { createContext, useContext, useState } from 'react';
// import useCookie from '../hooks/useCookie';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const accessToken = useCookie('access_token');
//   // console.log("Access Token from useCookie:", accessToken); // To debug
//   const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);
//   // console.log("isLoggedIn state in AuthContext:", isLoggedIn); // To debug
//   return (
//     <AuthContext.Provider value={{ isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { parseCookies } from 'nookies';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    setIsLoggedIn(!!cookies['access_token']);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
