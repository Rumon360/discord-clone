import '../styles/globals.css';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
