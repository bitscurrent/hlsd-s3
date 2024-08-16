import Image from "next/image";
import styles from "./page.module.css";

import UploadForm from "@/client/pages/uploads";

import { SessionProvider } from 'next-auth/react';

export default function Home({ Component, pageProps }) {
  return (
    
    <>
    {/* <SessionProvider session={pageProps.session}> */}
      {/* <Component {...pageProps} /> */}
      <UploadForm />
    {/* </SessionProvider> */}

    </>
  );
}




