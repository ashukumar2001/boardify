import { Button } from "@/components/ui/button";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function NoResult({
  imageUrl,
  title,
  description,
  isCreateBoard,
}: {
  imageUrl: string;
  title: string;
  description?: string;
  isCreateBoard?: boolean;
}) {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();
  const handleCreateBoard = () => {
    if (!organization) return;
    mutate({
      title: "Untitled",
      orgId: organization.id,
    })
      .then((id) => {
        toast.success("Board created!");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Unable to create board"));
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={imageUrl} alt="Empty" height={180} width={180} />
      {title && <h2 className="text-2xl font-semibold mt-6">{title}</h2>}
      {description && (
        <p className="text-muted-foreground text-sm mt-2">{description}</p>
      )}
      {isCreateBoard && (
        <Button disabled={pending} className="mt-6" onClick={handleCreateBoard}>
          Create board
        </Button>
      )}
    </div>
  );
}
