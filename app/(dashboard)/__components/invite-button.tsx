"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { OrganizationProfile, useOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const InviteButton = () => {
  const { organization } = useOrganization();
  if (!organization) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden md:flex">
          <Plus className="h-4 w-4 mr-2" />
          &nbsp;Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
