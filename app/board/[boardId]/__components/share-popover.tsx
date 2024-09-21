import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { type User } from "@clerk/nextjs/server";
import { type UseMutateFunction, useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { getUsers } from "@/api/get-user";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { removeUserFromRoom } from "@/actions/remove-from-room";
import { useRoom } from "@liveblocks/react/suspense";
import { Loader2 } from "lucide-react";
const SharePopover = memo(({ boardId }: { boardId: string }) => {
  const room = useRoom();
  const router = useRouter();
  const { user: loggedInUser } = useUser();
  const { data: boardUserIds = [] } = useQuery(
    convexQuery(api.userBoards.getBoardUserIds, { boardId })
  );
  const {
    mutate: addBoardUser,
    isPending: isPendingAddBoardUser,
    variables: addBoardUserArgs,
  } = useApiMutation(api.userBoard.create);
  const { mutate: removeBoardUser } = useApiMutation(api.userBoard.remove);
  const { data: boardUsers = [], isLoading: isLoadingBoardUsers } = useQuery({
    queryKey: ["get-users", boardUserIds],
    queryFn: async ({ queryKey }) => getUsers(queryKey[1]),
    enabled: !!boardUserIds?.length,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded, memberships } = useOrganization({
    memberships: { pageSize: 5, keepPreviousData: true },
  });
  const { data: board } = useQuery(
    convexQuery(api.board.get, { id: boardId as Id<"boards"> })
  );

  const organizationMembers = useMemo(() => {
    return (
      (!!memberships?.data && memberships.data.map((m) => m.publicUserData)) ||
      []
    );
  }, [memberships]);

  const inviteUserOptions = useMemo(() => {
    if (organizationMembers.length > 0 && boardUserIds.length > 0) {
      return organizationMembers.filter(
        (u) => !boardUserIds.includes(u.userId!)
      );
    }
    return [];
  }, [organizationMembers, boardUserIds]);

  useEffect(() => {
    const unsubscribeRoom = room.subscribe("event", ({ event }) => {
      const ev = event as { type: string; userId: string };
      if (ev.type === "user-removed" && ev.userId === loggedInUser?.id) {
        room.disconnect();
        toast("Access removed", {
          style: { justifyContent: "space-between" },
          description: "You are removed from this board",
          action: (
            <Button onClick={() => router.replace("/")} size="sm">
              dashboard
            </Button>
          ),
        });
      }
    });
    return () => {
      unsubscribeRoom();
    };
  }, [loggedInUser?.id, room, router]);

  if (!isLoaded) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">Share</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="z-[301] space-y-5 w-[360px]">
        <div ref={containerRef} className="space-y-2">
          <p className="font-medium">Invite Member</p>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type email or name" />
            <CommandList className="max-h-40">
              <CommandEmpty>
                {inviteUserOptions.length === 0
                  ? "Add users to organization"
                  : "No results found."}
              </CommandEmpty>
              {inviteUserOptions.length > 0 && (
                <CommandGroup heading="Organization members">
                  {inviteUserOptions.map((mem) => {
                    return (
                      <CommandItem
                        key={mem.userId}
                        onSelect={(value) => {
                          addBoardUser(
                            {
                              boardId: boardId as Id<"boards">,
                              userId: value,
                            },
                            {
                              onSuccess() {
                                toast.success("User added to board");
                              },
                              onError(error) {
                                toast.error(error.message);
                              },
                            }
                          );
                        }}
                        keywords={[mem?.firstName!, mem?.identifier]}
                        value={mem.userId}
                      >
                        <div className="flex gap-2 items-center w-full">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={mem?.imageUrl}
                              alt={mem?.firstName!}
                            />
                            <AvatarFallback>
                              {mem?.firstName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <span className="text-sm font-semibold block">
                              {mem?.firstName}
                            </span>
                            <span className="text-xs text-neutral-600 dark:text-neutral-400 block">
                              {mem?.identifier}
                            </span>
                          </div>

                          {isPendingAddBoardUser &&
                            addBoardUserArgs?.userId === mem.userId && (
                              <Loader2 className="animate-spin" size={14} />
                            )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
              <CommandSeparator />
            </CommandList>
          </Command>
        </div>
        <Separator />
        {isLoadingBoardUsers ? (
          <BoardUserListSkeleton />
        ) : (
          boardUsers &&
          boardUsers.length > 0 &&
          boardUsers.map((u) => (
            <BoardUserListItem
              key={u.id}
              u={u}
              authorId={board?.authorId!}
              boardId={boardId}
              handleRemoveUser={removeBoardUser}
              loggedInUserId={loggedInUser?.id!}
            />
          ))
        )}
      </PopoverContent>
    </Popover>
  );
});

SharePopover.displayName = "SharePopover";

interface BoardUserListItemProps {
  u: User;
  authorId: string;
  boardId: string;
  loggedInUserId: string;
  handleRemoveUser: UseMutateFunction<
    null,
    Error,
    {
      userId: string;
      boardId: Id<"boards">;
    },
    unknown
  >;
}

const BoardUserListItem = ({
  u,
  authorId,
  handleRemoveUser,
  boardId,
  loggedInUserId,
}: BoardUserListItemProps) => {
  const handleRemoveUserClick = useCallback(() => {
    handleRemoveUser(
      {
        boardId: boardId as Id<"boards">,
        userId: u.id,
      },
      {
        onSuccess() {
          toast.success("User removed from board");
          removeUserFromRoom(boardId, u.id)
            .then((v) => {
              console.log(v);
            })
            .catch((error) => {
              console.log("error from server action", error);
            });
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  }, [u.id, boardId, handleRemoveUser]);
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-8 h-8">
        <AvatarImage src={u?.imageUrl} alt={u?.firstName!} />
        <AvatarFallback>{u?.firstName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm font-semibold">{u?.firstName}</p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {u?.emailAddresses[0].emailAddress}
        </p>
      </div>
      {authorId === u.id ? (
        <p className="w-fit text-sm text-neutral-600 dark:text-neutral-400">
          Author
        </p>
      ) : loggedInUserId === authorId ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Member
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit z-[303] p-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveUserClick}
            >
              Remove form board
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <p className="w-fit text-sm text-neutral-600 dark:text-neutral-400">
          Member
        </p>
      )}
    </div>
  );
};
const BoardUserListSkeleton = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);
export default SharePopover;
