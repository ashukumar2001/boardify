import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search";
import InviteButton from "./invite-button";

export const Navbar = () => {
  return (
    <nav className="flex items-center gap-x-4 px-5 pt-5 pb-3">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "320px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>

      <InviteButton />
      <UserButton />
    </nav>
  );
};
