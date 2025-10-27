// web-frontend/pages/_app.js
import '@/styles/globals.css'; // Global CSS, create this file below
import { Inter } from '@next/font/google'; // Import Google Font
import { ConfigProvider } from 'antd'; // Ant Design ConfigProvider

// Configure Inter font
const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider> {/* Apply Ant Design theme and settings globally */}
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;