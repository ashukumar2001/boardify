"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function RenameModal() {
  const { mutate, isPending } = useApiMutation(api.board.update);
  const { initialValues, isOpen, onClose } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(
      {
        id: initialValues.id as Id<"boards">,
        title,
      },
      {
        onSuccess() {
          toast.success("Board renamed");
          onClose();
        },
        onError() {
          toast.error("Unable to rename board");
        },
      }
    );
  };
  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            disabled={isPending}
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
            autoFocus
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending}>
              {isPending ? "Saving" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
