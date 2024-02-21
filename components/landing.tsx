import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Landing() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
          <span className="sr-only">Boardify</span>
        </Link>
        <div className="ml-auto">
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:py-t xl:pt-48  dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The online whiteboard for your team's best work
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                From brainstorming with digital sticky notes to planning and
                managing agile workflows, Boardify has everything you need to
                move work forward.
              </p>
            </div>
            <div className="flex flex-col">
              <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="grid w-full grid-cols-2 lg:grid-cols-2 items-center justify-center gap-8 lg:gap-12 [&>img]:mx-auto">
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Real-time Changes</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Experience instant updates and see changes in real-time.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Real-time Cursors</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Collaborate seamlessly with real-time cursor tracking.
                    </p>
                  </div>
                </div>
              </section>
              <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  © 2024 Boardify. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                  <Link
                    className="text-xs hover:underline underline-offset-4"
                    href="/"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    className="text-xs hover:underline underline-offset-4"
                    href="/"
                  >
                    Privacy
                  </Link>
                </nav>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
