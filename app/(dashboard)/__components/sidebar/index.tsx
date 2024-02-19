import AddNewOrgButton from "./add-new-org";
import OrgList from "./org-list";

const Sidebar = () => {
  return (
    <aside className="h-full fixed z-[1] left-0 bg-brand-primary w-[60px] flex flex-col text-white items-center py-3">
      <OrgList />
      <AddNewOrgButton />
    </aside>
  );
};
export default Sidebar;
