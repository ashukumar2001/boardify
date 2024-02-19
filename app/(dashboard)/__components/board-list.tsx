"use client";
import { useQuery } from "convex/react";
import NoResult from "./no-result";
import { api } from "@/convex/_generated/api";
import BoardCard from "./board-card";
import AddBoardButton from "./add-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}
const noDataContent = {
  favourite: {
    imageUrl: "/no-favourites.svg",
    title: "No favourite boards!",
    description: "Try adding a board to favourite",
  },
  search: {
    imageUrl: "/no-data.svg",
    title: "No results found!",
    description: "Try searching for something else",
  },
  board: {
    imageUrl: "/no-data.svg",
    title: "Create your first board!",
    description: "Start by creating a board",
    isCreateBoard: true,
  },
};
export default function BoardList({ orgId, query }: BoardListProps) {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-2xl">
          {query.favourites ? "Favourite" : "Team"}&nbsp;boards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <AddBoardButton orgId={orgId} disabled={false} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }
  if (!data?.length && query.search)
    return <NoResult {...noDataContent.search} />;
  if (!data?.length && query.favourites)
    return <NoResult {...noDataContent.favourite} />;
  if (!data.length) return <NoResult {...noDataContent.board} />;
  return (
    <div>
      <h2 className="text-2xl">
        {query.favourites ? "Favourite" : "Team"}&nbsp;boards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <AddBoardButton orgId={orgId} disabled={false} />
        {data.map((board) => {
          return (
            <BoardCard
              key={board._id}
              {...board}
              isFavourite={board.isFavourite}
            />
          );
        })}
      </div>
    </div>
  );
}
