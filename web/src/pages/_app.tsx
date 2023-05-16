import React from "react";
import Router from "next/router";

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import dynamic from "next/dynamic";
import { Loader } from "../components/shared/Loader";
import Head from "next/head";


const NavWrapper = dynamic(() => import("../components/shared/Navbar"), {
  ssr: false,
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <script type="text/javascript" src="/js/maze.js" defer />
      </Head>
      <SessionProvider session={session}>
        <Loader />
        <NavWrapper className="bg-base-0 min-h-screen w-full">
          <Component {...pageProps} />
        </NavWrapper>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
