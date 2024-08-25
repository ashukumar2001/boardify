"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AddBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export default function AddBoardButton({
  orgId,
  disabled,
}: AddBoardButtonProps) {
  const router = useRouter();
  const { mutate, isPending } = useApiMutation(api.board.create);
  const handleCreateBoard = () => {
    mutate(
      {
        title: "Untitled",
        orgId,
      },
      {
        onSuccess(id) {
          toast.success("Board created!");
          router.push(`/board/${id}`);
        },
        onError() {
          toast.error("Unable to create board");
        },
      }
    );
  };
  return (
    <button
      disabled={isPending || disabled}
      onClick={handleCreateBoard}
      className={cn(
        "col-span-1 aspect-[100/127] bg-brand rounded-lg hover:bg-brand-primary flex flex-col items-center justify-center py-6 transition",
        (isPending || disabled) && "opacity-75 hover:bg-brand"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">Add new board</p>
    </button>
  );
}
