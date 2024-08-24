import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <main className="h-screen w-screen overflow-hidden relative touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </main>
  );
}
