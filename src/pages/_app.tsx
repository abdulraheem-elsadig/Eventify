import Logo from "@/components/Logo";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <title>Eventify</title>
        <meta
          name="description"
          content="Manage events easily with Eventify – your all-in-one solution for planning, registration, ticketing, and real-time updates."
        />
        <meta property="og:title" content="Eventify" />
        <meta
          property="og:description"
          content="Manage events easily with Eventify – your all-in-one solution for planning, registration, ticketing, and real-time updates."
        />
        <meta property="og:image" content="/favicon/favicon-96x96.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eventify" />
        <meta name="twitter:description" content="/favicon/favicon-96x96.png" />
        <meta name="twitter:image" content="/favicon/favicon-96x96.png" />
      </Head>
      <div className="container">
        <Logo />
        <Component {...pageProps} />
      </div>
    </>
  );
}
