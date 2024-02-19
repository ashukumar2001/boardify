"use client";

import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useCallback } from "react";
const OrgList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!userMemberships.data?.length) return null;
  return (
    <ul className="space-y-4 mb-4 w-1/2">
      {userMemberships.data.map((m) => {
        const { id, name, imageUrl } = m.organization;
        return <OrgListItem key={id} id={id} name={name} imageUrl={imageUrl} />;
      })}
    </ul>
  );
};

export default OrgList;

interface OrgListItemProps {
  id: string;
  name: string;
  imageUrl: string;
}
export const OrgListItem = ({ id, name, imageUrl }: OrgListItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;
  const handleClick = useCallback(() => {
    if (!setActive) return;
    setActive({ organization: id });
  }, [id, setActive]);
  return (
    <div className="aspect-square relative">
      <Hint label={name} align="center" side="right" sideOffset={12}>
        <Image
          src={imageUrl}
          alt={name}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition w-full h-full",
            isActive && "opacity-100"
          )}
          onClick={handleClick}
          width={24}
          height={24}
        />
      </Hint>
    </div>
  );
};
