"useclient";
import { type DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, PlusCircle, SunMoon, Trash } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ConfirmationModal from "./confirmation-modal";
import { useRenameModal } from "@/store/use-rename-modal";
import { useTheme } from "next-themes";
interface BoardActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: Id<"boards">;
  title: string;
  isAuthor?: boolean;
  userBoardId?: Id<"userBoards">;
  showAppearanceMenu?: boolean;
}

export default function BoardActions({
  children,
  id,
  title,
  side,
  sideOffset,
  userBoardId,
  isAuthor = false,
  showAppearanceMenu = false,
}: BoardActionsProps) {
  const { setTheme } = useTheme();
  const { onOpen } = useRenameModal();
  const { mutate, isPending } = useApiMutation(api.board.remove);
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied!"));
  };

  const handleDeleteBoard = () => {
    mutate(
      { id, userBoardId },
      {
        onSuccess() {
          toast.success("Board deleted!");
        },
        onError() {
          toast.error("Failed to delete board");
        },
      }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        align="start"
        className="w-48"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>

        {isAuthor && (
          <DropdownMenuItem>
            <ConfirmationModal
              header="Are you sure you want to delete this board?"
              description="This will delete the board and all of its content"
              disabled={isPending}
              onConfirm={handleDeleteBoard}
            >
              <span className="flex">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </span>
            </ConfirmationModal>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => {
            onOpen(id, title);
          }}
          className="cursor-pointer"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        {showAppearanceMenu && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon className="h-4 w-4 mr-2" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem> */}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
