import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import dynamic from "next/dynamic";

const NavWrapper = dynamic(() => import("../components/shared/Navbar"), {
  ssr: false,
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NavWrapper className="bg-base-0 min-h-screen w-full">
        <Component {...pageProps} />
      </NavWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
