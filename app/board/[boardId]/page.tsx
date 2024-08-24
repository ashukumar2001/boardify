"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DocEditor from "./__components/document-editor/editor";
import Info from "./__components/info";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import TldrawWrapper from "./__components/tldraw/canvas";
import SharePopover from "./__components/share-popover";
import { useErrorListener } from "@liveblocks/react/suspense";
import BoardAccessErrorPage from "./__components/board-access-error";
import Participants from "./__components/participants";
export interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
type TabType = "both" | "canvas" | "document";
export default function BoardId({ params }: BoardIdPageProps) {
  const [currentTab, setCurrentTab] = useState<TabType>("both");
  const [isError, setIsError] = useState(false);
  useErrorListener((error) => {
    console.log("liveblock room error: ", error);
    setIsError(true);
  });
  return (
    <div className="flex flex-col h-screen">
      {!isError ? (
        <>
          <div className="w-screen border-b h-16 flex justify-between items-center px-3">
            <Info boardId={params.boardId} />
            <Tabs
              defaultValue="both"
              onValueChange={(v) => setCurrentTab(v as TabType)}
            >
              <TabsList>
                <TabsTrigger value="document">Document</TabsTrigger>
                <TabsTrigger value="both">Both</TabsTrigger>
                <TabsTrigger value="canvas">Canvas</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <Participants />
              <SharePopover boardId={params.boardId} />
            </div>
          </div>

          <ResizablePanelGroup className="flex-1" direction="horizontal">
            {(currentTab === "document" || currentTab === "both") && (
              <ResizablePanel
                defaultSize={currentTab === "both" ? 50 : 100}
                minSize={20}
              >
                <DocEditor />
              </ResizablePanel>
            )}

            {currentTab === "both" && <ResizableHandle />}
            {(currentTab === "canvas" || currentTab === "both") && (
              <ResizablePanel defaultSize={currentTab === "both" ? 50 : 100}>
                <TldrawWrapper />
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </>
      ) : (
        <BoardAccessErrorPage />
      )}
    </div>
  );
}
