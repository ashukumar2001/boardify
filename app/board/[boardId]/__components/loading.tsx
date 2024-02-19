import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export default function Loading() {
  return (
    <main className="h-screen w-screen overflow-hidden relative bg-neutral-200 touch-none flex items-center justify-center">
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </main>
  );
}
