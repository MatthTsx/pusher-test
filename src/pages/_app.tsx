import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import SignProfiver from "~/providers/SignProfiver";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SignProfiver>
        <Component {...pageProps} />
      </SignProfiver>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
