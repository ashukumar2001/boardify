"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "@/liveblocks.config";
import UserAvatar from "./user-avatar";
import { toColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

export default function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={toColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "A"}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            borderColor={toColor(currentUser.connectionId)}
            key={currentUser.connectionId}
            name={`${currentUser.info?.name} (You)`}
            src={currentUser.info?.picture}
            fallback={currentUser.info?.name?.[0] || "A"}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
}
export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 w-[240px] right-2 rounded-md flex items-center shadow-md">
      <Skeleton className="h-full w-full bg-muted" />
    </div>
  );
}
