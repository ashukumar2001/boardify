import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

export default function EmptyOrg() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/blank_canvas.svg" alt="Empty" height={180} width={180} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create orgranization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
