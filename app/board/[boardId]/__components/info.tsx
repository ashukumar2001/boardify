"use client";
import Image from "next/image";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hint from "@/components/hint";
import { Separator } from "@/components/ui/separator";
// import { useRenameModal } from "@/store/use-rename-modal";
import BoardActions from "@/components/board-actions";
import { EllipsisVertical } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface InfoProps {
  boardId: string;
}
export default function Info({ boardId }: InfoProps) {
  // const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!data) return <InfoSkeleton />;
  return (
    <div className="rounded-md h-10 flex items-center w-fit">
      <Hint label="Go to boards" side="bottom" sideOffset={12}>
        <Button asChild className="px-2" variant="ghost" size="sm">
          <Link href="/">
            <Image
              src="/logo.svg"
              height={24}
              width={24}
              alt="Boardify"
              className="aspect-square"
              priority={false}
            />
            <span
              className={cn("font-semibold text-base ml-2", font.className)}
            >
              Boardify
            </span>
          </Link>
        </Button>
      </Hint>
      <Separator orientation="vertical" className="h-1/2 mx-2" />
      <Button
        className=" text-sm font-normal px-2"
        variant="ghost"
        // onClick={() => onOpen(data._id, data.title)}
        size="sm"
      >
        {data.title}
      </Button>
      <Separator orientation="vertical" className="h-1/2 mx-2" />
      <BoardActions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={6}
        showAppearanceMenu
      >
        <Button size="icon-xs" variant="ghost">
          <EllipsisVertical size={16} />
        </Button>
      </BoardActions>
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 w-[240px] rounded-md h-12 flex items-center shadow-md">
      <Skeleton className="h-full w-full bg-muted" />
    </div>
  );
}
