"use client";
import React from "react";
import { BoardIdPageProps } from "./page";
import Room from "@/components/room";
import Loading from "./__components/loading";

const Layout = ({
  params,
  children,
}: BoardIdPageProps & { children: React.ReactNode }) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      {children}
    </Room>
  );
};

export default Layout;
