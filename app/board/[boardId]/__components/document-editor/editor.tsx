"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
// import TranslateDoc from "./translate-doc";
import { useTheme } from "next-themes";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function DocEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto h-full w-full relative overflow-y-auto">
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 border p-2 rounded-md">
        <TranslateDoc doc={doc} />
      </div> */}
      <BlockNote doc={doc} provider={provider} />
    </div>
  );
}

function BlockNote({ doc, provider }: EditorProps) {
  const { theme } = useTheme();
  const name = useSelf((me) => me.info.name || "Anonymous");
  const { color } = useSelf((me) => me.presence);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information for this user:
      user: {
        name,
        color,
      },
    },
  });
  return (
    <BlockNoteView
      editor={editor}
      className="min-h-full pb-16 pt-28"
      theme={theme === "light" ? "light" : "dark"}
      data-theme-stone
    />
  );
}

export default DocEditor;
