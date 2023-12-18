import { AuthProvider } from '../context/authContext'; // Adjust the path as necessary
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
