"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "./footer";
import Overlay from "./overlay";
import BoardActions from "@/components/board-actions";
import { MoreHorizontal } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  _id: Id<"boards">;
  _creationTime: number;
  orgId: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  isFavourite: boolean;
  userBoardId: Id<"userBoards">;
}

export default function BoardCard({
  _id,
  _creationTime,
  authorId,
  authorName,
  imageUrl,
  orgId,
  title,
  isFavourite,
  userBoardId,
}: BoardCardProps) {
  const { userId } = useAuth();
  const { mutate: favourite, isPending: pendingFavourite } = useApiMutation(
    api.board.favourite
  );
  const { mutate: unFavourite, isPending: pendingUnFavourite } = useApiMutation(
    api.board.unFavourite
  );
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(_creationTime, {
    addSuffix: true,
  });

  const toggleFavourite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFavourite)
      unFavourite(
        { userBoardId },
        {
          onError() {
            toast.error("Failed to un-favourite");
          },
        }
      );
    else
      favourite(
        { userBoardId },
        {
          onError() {
            toast.error("Failed to favourite");
          },
        }
      );
  };
  return (
    <Link href={`/board/${_id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50 dark:bg-gray-800">
          <Image src={imageUrl} alt={title} fill className="object-fill" />
          <Overlay />
          <BoardActions
            id={_id}
            title={title}
            side="right"
            isAuthor={userId === authorId}
            userBoardId={userBoardId}
          >
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </BoardActions>
        </div>
        <Footer
          isFavourite={isFavourite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavourite}
          disabled={pendingFavourite || pendingUnFavourite}
        />
      </div>
    </Link>
  );
}
BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127]  rounded-lg  overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
