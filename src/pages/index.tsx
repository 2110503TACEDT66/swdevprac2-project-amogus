import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <div className="relative px-6 pt-14 lg:px-8">
      <motion.div
        className="absolute z-[-1] inset-0 bg-[url(/hero.png)]"
        style={{
          backgroundPosition: "0px 0px",
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        animate={{
          backgroundPositionX: ["0px", "-1000px", "0px"],
          backgroundPositionY: "0px",
        }}
      />
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#799496] sm:text-6xl ">
            Campground AmongUs
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#ACC196]">
            Definitly not a sus place to camp. No imposters here, only
            crewmates. <span className="text-red-500">or are they?</span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/campgrounds"
              className="rounded-md bg-[#E9EB9E] px-3.5 py-2.5 text-sm font-semibold text-[#ACC196] shadow-sm hover:bg-[#ACC196] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Browse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
