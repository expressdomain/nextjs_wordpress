import React, { useState } from "react";
import { Layout } from "../components/layouts/layout";
import Link from "next/link";
import { useRouter } from "next/router";

const Custom404 = (): JSX.Element => {
  const router = useRouter();
  const [word, setWord] = useState<string>("");

  const handleSearch = () =>
    router.replace(`/?word=${word}`, undefined, { shallow: true });

  return (
    <Layout
      title="Not found"
      description="ページが見つかりません"
      setWord={setWord}
      handleSearch={handleSearch}
    >
      <div className="py-5 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                ページリンクを間違えている、もしくは
                HP移行に伴い一部のページでリンクが正常に機能していない箇所がございます。
              </p>
              <div className="mt-6">
                <Link as="/" href="/">
                  <a
                    className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                    href="/"
                  >
                    Go back home
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Custom404;
