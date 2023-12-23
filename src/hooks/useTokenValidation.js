import { useState, useEffect } from 'react';

const useTokenValidation = (accessToken) => {
    const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const validateToken = () => {
      if (!accessToken) {
        setIsTokenValid(false);
        return;
      }

      const payloadBase64 = accessToken.split('.')[1];
      const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
      const payload = JSON.parse(decodedJson);
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);

      setIsTokenValid(now < exp);
    };

    validateToken();

    // Set a timeout to update the token validity a minute before it expires
    const exp = JSON.parse(atob(accessToken.split('.')[1])).exp;
    const timeout = (exp - Math.floor(Date.now() / 1000) - 60) * 1000;
    const timer = setTimeout(validateToken, timeout > 0 ? timeout : 0);

    return () => clearTimeout(timer);
  }, [accessToken]);

  return isTokenValid;
}

export default useTokenValidation;