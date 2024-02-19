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
import { useRenameModal } from "@/store/use-rename-modal";
import BoardActions from "@/components/board-actions";
import { Menu } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface InfoProps {
  boardId: string;
}
export default function Info({ boardId }: InfoProps) {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!data) return <InfoSkeleton />;
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-fit">
      <Hint label="Go to boards" side="bottom" sideOffset={12}>
        <Button asChild className="px-2" variant="board">
          <Link href="/">
            <Image src="/logo.svg" height={40} width={40} alt="Boardify" />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Boardify
            </span>
          </Link>
        </Button>
      </Hint>
      <Separator orientation="vertical" className="h-1/2 mx-2" />
      <Hint label="Edit title" side="bottom" sideOffset={12}>
        <Button
          className="text-base font-normal px-2"
          variant="board"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <Separator orientation="vertical" className="h-1/2 mx-2" />

      <BoardActions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={12}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={12}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
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
