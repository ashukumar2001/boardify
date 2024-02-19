"use client";
import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./__components/empty-org";
import BoardList from "./__components/board-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favourites?: string;
  };
}
export default function Dashboard({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization();
  return (
    <section className="flex-1 p-5 h-[calc(100%-72px)] overflow-auto">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </section>
  );
}
