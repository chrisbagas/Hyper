import React from "react";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAtom } from "jotai";
import { scrollAtom } from "../../components/shared/Navbar";

import useSWR from "swr"
import { truncate } from "../../utils/truncate";
import Link from "next/link";

const Landing: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  const [scroll] = useAtom(scrollAtom)

  const { data, isLoading } = useSWR(process.env.NEXT_PUBLIC_GHOST_POSTS_URL, (url) => fetch(url).then((res) => res.json()))

  React.useEffect(() => {
    console.log(data)
  }, [data])

  if (session.status === "authenticated") {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Hyper</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="flex flex-col gap-y-0">
        <div className={`${scroll > 0 ? "bg-base-1" : "bg-transparent"} transition-all z-20 fixed w-full px-16 py-4 flex justify-between`}>
          <img src="/white-horizontal-logo.svg" className="h-12" />
          <button className="btn bg-other-discord font-bold gap-2" onClick={() => signIn()}>
            <p className="font-bold text-neutral-0">Sign Up</p>
          </button>
        </div>

        <header className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover bg-[url('/lpbg1.jpg')]">
          <div className="flex flex-col gap-y-4 items-center">

            <div className="flex flex-row space-x-4 items-center mb-4">
              <img src="/white-logo-only.svg" className="h-12 md:h-16" />
            </div>

            <h1 className="font-bold text-neutral-0 text-3xl lg:text-7xl text-center">Connect. Engage. Team-up.</h1>
            <p className="text-neutral-0 text-base text-center">Welcome to Hyper, a dedicated platform for you to interact with other players.</p>

            <button className="btn bg-other-discord font-bold gap-2 mt-4" onClick={() => signIn()}>
              <div className="bg-neutral-0 rounded-full text-other-discord w-6 h-6 flex justify-center items-center">
                <svg className="fill-current w-4 h-4" width="13" height="10" viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.76 1.15175C9.98051 0.794153 9.13654 0.534605 8.25739 0.384644C8.23981 0.384644 8.22809 0.390411 8.21636 0.401947C8.11087 0.592282 7.98779 0.840295 7.90573 1.03063C6.96212 0.892204 6.0185 0.892204 5.09247 1.03063C5.01041 0.834527 4.88733 0.592282 4.77598 0.401947C4.77012 0.390411 4.75253 0.384644 4.73495 0.384644C3.8558 0.534605 3.01769 0.794153 2.23232 1.15175C2.22646 1.15175 2.22059 1.15752 2.21473 1.16329C0.62055 3.51076 0.180978 5.79478 0.397834 8.05573C0.397834 8.06727 0.403695 8.07881 0.415416 8.08457C1.47039 8.84591 2.48434 9.30733 3.48656 9.61302C3.50415 9.61879 3.52173 9.61302 3.52759 9.60149C3.76203 9.28426 3.97302 8.94973 4.15471 8.5979C4.16644 8.57483 4.15471 8.55176 4.13127 8.54599C3.79719 8.4191 3.4807 8.26914 3.17007 8.09611C3.14663 8.08457 3.14663 8.04997 3.16421 8.03266C3.22868 7.98652 3.29315 7.93461 3.35762 7.88847C3.36934 7.87693 3.38693 7.87693 3.39865 7.8827C5.41482 8.78824 7.58924 8.78824 9.58197 7.8827C9.59369 7.87693 9.61127 7.87693 9.623 7.88847C9.68747 7.94038 9.75194 7.98652 9.81641 8.03843C9.83985 8.05573 9.83985 8.09034 9.81055 8.10188C9.50578 8.28068 9.18342 8.42487 8.84935 8.55176C8.8259 8.55753 8.82004 8.58637 8.8259 8.60367C9.01346 8.9555 9.22445 9.29003 9.45303 9.60726C9.47061 9.61302 9.48819 9.61879 9.50578 9.61302C10.5139 9.30733 11.5278 8.84591 12.5828 8.08457C12.5945 8.07881 12.6004 8.06727 12.6004 8.05573C12.8582 5.44295 12.1725 3.17623 10.7835 1.16329C10.7776 1.15752 10.7717 1.15175 10.76 1.15175ZM4.45948 6.67725C3.8558 6.67725 3.35176 6.12931 3.35176 5.45448C3.35176 4.77966 3.84408 4.23172 4.45948 4.23172C5.08075 4.23172 5.57307 4.78543 5.56721 5.45448C5.56721 6.12931 5.07489 6.67725 4.45948 6.67725ZM8.54458 6.67725C7.9409 6.67725 7.43686 6.12931 7.43686 5.45448C7.43686 4.77966 7.92918 4.23172 8.54458 4.23172C9.16584 4.23172 9.65816 4.78543 9.6523 5.45448C9.6523 6.12931 9.16584 6.67725 8.54458 6.67725Z" fill="current" />
                </svg>
              </div>
              <p className="font-bold text-neutral-0">Connect Discord</p>
            </button>

          </div>
        </header>

        <div className="relative flex flex-col items-center w-full h-px z-10 bg-base-5">
          <div className="absolute -top-20 flex flex-col w-fit h-fit py-6 px-12 gap-y-4 items-center border border-base-5 rounded-md bg-gradient-to-r from-primary-border to-primary-pressed">
            <h1 className="text-xl font-bold text-neutral-0">Supported Games</h1>
            <div className="flex flex-row gap-x-8">
              <img src="/apex.png" alt="" className="h-16 md:h-20" />
              <img src="/valorant-w.png" alt="" className="h-16 md:h-20" />
            </div>
          </div>
        </div>

        <section className="flex pb-32 pt-40 items-center justify-center h-fit bg-fixed bg-center bg-cover bg-[url('/lpbg2.jpg')]">
          <div className="flex flex-col gap-y-16 items-center text-neutral-0">

            <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-24 w-2/3 items-center">
              <img src="/feature-party.png" className="h-64 md:h-96" />
              <div className="flex flex-col gap-y-4 w-full">
                <h1 className="text-3xl font-bold">Join or create parties on your favorite game</h1>
                <p className="text-base text-base-5">Team up with other people in your favorite game and play together, whether it is random or someone with a similar rank</p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-y-8 lg:flex-row lg:gap-x-24 w-2/3 items-center">
              <div className="flex flex-col gap-y-4 w-full">
                <h1 className="text-3xl font-bold">Create or share guides or clips to other players</h1>
                <p className="text-base text-base-5">Write blog-like guides using our powerful markdown tool so you can express your knowledge freely</p>
              </div>
              <img src="/feature-post.png" className="h-64 md:h-96" />
            </div>

          </div>
        </section>

        <div className="relative flex flex-col items-center w-full h-px z-10 bg-base-5" />

        <div className="m-24 items-center space-y-12">
          <h1 className="text-3xl font-bold text-neutral-0 text-center">View Our Development Journey</h1>
          <div className="grid grid-cols-4 gap-8">
            {data?.posts?.map((item: any) => (
              <Link target="_blank" rel="noreferrer" href={process.env.NEXT_PUBLIC_GHOST_URL + item.slug} className="h-full duration-300 transition-all hover:-translate-y-3">
                <div className="card flex flex-col justify-between bg-base-100 shadow-xl h-full">
                  <div className="relative aspect-square object-cover rounded-t-xl bg-base-1 flex items-center justify-center">
                    {item.feature_image ? (
                      <img src={item.feature_image} className="aspect-square object-cover rounded-t-xl" alt="Header" />
                    ) : (
                      <img src="/white-logo-only.svg" className="h-1/3 w-1/3 opacity-10" />
                    )}
                    <div className="bg-gradient-to-t from-base-100 to-transparent absolute w-full bottom-0 h-8 z-10" />
                  </div>
                  <div className="card-body">
                    <div>
                    </div>
                    <h2 className="card-title text-white">
                      {truncate(item.title, 30)}
                    </h2>
                    <p>Created by {item.authors[0].name}</p>
                    <p className="truncate">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={`bg-base-1 transition-all z-20 w-full px-16 py-4 flex justify-between`}>
          <img src="/white-horizontal-logo.svg" className="h-10" />
          <img src="/rights.svg" className="h-10" />
        </div>

      </div>
    </>
  );
};

export default Landing;


