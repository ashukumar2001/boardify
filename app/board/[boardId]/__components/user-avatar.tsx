import Hint from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  borderColor?: string;
  fallback?: string;
}
export default function UserAvatar({
  borderColor,
  name,
  src,
  fallback,
}: UserAvatarProps) {
  return (
    <Hint label={name || "Anonymus"} side="bottom" sideOffset={16}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}
