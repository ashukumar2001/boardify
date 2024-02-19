import { cn } from "@/lib/utils";
import { Title } from "@radix-ui/react-dialog";
import { Star } from "lucide-react";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
  isFavourite: boolean;
}
export default function Footer({
  title,
  authorLabel,
  createdAtLabel,
  disabled,
  isFavourite,
  onClick,
}: FooterProps) {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[100%-20px]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 text-[11px] text-muted-foreground truncate">
        {authorLabel},&nbsp;{createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-brand",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn("h-4 w-4", isFavourite && "fill-brand text-brand")}
        />
      </button>
    </div>
  );
}
