import React from "react";
import Router from "next/router";

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

import { atom, useAtom } from "jotai"

const NavWrapper = dynamic(() => import("../components/shared/Navbar"), {
  ssr: false,
})

export const ssgLoadingAtom = atom(false)

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [ssgLoading, setSsgLoading] = useAtom(ssgLoadingAtom)

  React.useEffect(() => {
    Router.events.on("routeChangeStart", () => setSsgLoading(true))
    Router.events.on("routeChangeComplete", () => setSsgLoading(false))
    Router.events.on("routeChangeError", () => setSsgLoading(false))
  })

  return (
    <SessionProvider session={session}>
      <div className="absolute top-0 w-screen">
        <LinearProgress className={`${ssgLoading ? "opacity-100" : "opacity-0"} transition-all text-base-5 z-20`} color="inherit" />
      </div>
      <NavWrapper className="bg-base-0 min-h-screen w-full">
        <Component {...pageProps} />
      </NavWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
