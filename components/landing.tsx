import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { HTMLAttributes } from "react";
import editorDemoImage from "@/public/app-demo/Boardify_editor-page.png";
export default function Landing() {
  return (
    <main>
      <header className="px-4 lg:px-6 h-14 flex items-center py-10">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={36}
            height={36}
            priority={false}
          />
          <span className="sr-only">Boardify</span>
        </Link>
        <div className="ml-auto">
          <GetStartedButton />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Streamline Collaboration with Integrated Document and Whiteboard
              Tools
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Collaborate on documents and whiteboards in one unified platform
              for maximum productivity.
            </p>
          </div>
          <div className="flex w-full border rounded-md overflow-hidden">
            <Image
              alt="board-example"
              className="w-full h-auto"
              src={editorDemoImage}
              sizes="100%"
              quality={100}
            />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg shadow-lg p-6 space-y-4 dark:bg-stone-900">
              <div className="flex items-center gap-4">
                <DrillIcon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">
                  Comprehensive Whiteboard Tools
                </h3>
              </div>
              <p className="text-muted-foreground">
                Leverage all the essential whiteboard features with Tldraw, from
                freehand drawing to shape creation and real-time collaboration.
              </p>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-6 space-y-4 dark:bg-stone-900">
              <div className="flex items-center gap-4">
                <FileIcon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Document Editing</h3>
              </div>
              <p className="text-muted-foreground">
                Seamlessly create, edit, and collaborate on documents within the
                same platform, reducing the need to switch between apps.
              </p>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-6 space-y-4 dark:bg-stone-900">
              <div className="flex items-center gap-4">
                <CombineIcon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">
                  Real-Time Collaboration
                </h3>
              </div>
              <p className="text-muted-foreground">
                Work together on both whiteboards and documents with live
                updates, comments, and easy sharing.
              </p>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-6 space-y-4 dark:bg-stone-900">
              <div className="flex items-center gap-4">
                <PaletteIcon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Customizable Themes</h3>
              </div>
              <p className="text-muted-foreground">
                Switch between light and dark modes, with personalized hex color
                cursors for enhanced visibility.
              </p>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-6 space-y-4 dark:bg-stone-900 col-span-1 md:col-span-2">
              <div className="flex items-center gap-4">
                <ShareIcon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">
                  Easy Export and Sharing
                </h3>
              </div>
              <p className="text-muted-foreground">
                Share both documents and whiteboards effortlessly through links
                or exports to various formats.
              </p>
            </div>
          </div>
          <div className="text-center">
            <GetStartedButton />
            <p className="mt-4 text-muted-foreground">
              Collaborate on documents and whiteboards like never before.
            </p>
          </div>
        </div>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row sm:justify-center py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Boardify. All rights reserved.
        </p>
        {/* <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Privacy
          </Link>
        </nav> */}
      </footer>
    </main>
  );
}
function CombineIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="8" x="2" y="2" rx="2" />
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
      <polyline points="7 21 10 18 7 15" />
      <rect width="8" height="8" x="14" y="14" rx="2" />
    </svg>
  );
}

function DrillIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9c0 .6-.4 1-1 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9c.6 0 1 .4 1 1Z" />
      <path d="M18 6h4" />
      <path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" />
      <path d="m5 10-2 8" />
      <path d="M12 10v3c0 .6-.4 1-1 1H8" />
      <path d="m7 18 2-8" />
      <path d="M5 22c-1.7 0-3-1.3-3-3 0-.6.4-1 1-1h7c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1Z" />
    </svg>
  );
}

function FileIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function PaletteIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function ShareIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
const GetStartedButton = () => {
  return (
    <SignInButton>
      <Button>Get Started</Button>
    </SignInButton>
  );
};
