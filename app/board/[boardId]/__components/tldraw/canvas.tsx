import { useYjsStore } from "@/hooks/use-yjs-store";
import { useTheme } from "next-themes";
import { memo, useEffect } from "react";
import { Tldraw, TLUiComponents, useEditor } from "tldraw";
import "tldraw/tldraw.css";
const MAX_ASSET_SIZE = 5 * 1024 * 1024;

const components: TLUiComponents = {
  DebugPanel: null,
  DebugMenu: null,
  SharePanel: null,
  PageMenu: null,
};

const TldrawWrapper = memo(() => {
  const store = useYjsStore({});
  return (
    <div className="w-auto h-full">
      <Tldraw
        store={store}
        maxAssetSize={MAX_ASSET_SIZE}
        components={components}
      >
        <InsideOfContext />
      </Tldraw>
    </div>
  );
});
TldrawWrapper.displayName = "TldrawWrapper";
export default TldrawWrapper;

const InsideOfContext = () => {
  const editor = useEditor();
  const { theme } = useTheme();

  useEffect(() => {
    editor.user.updateUserPreferences({
      colorScheme: theme as "dark" | "light" | "system" | undefined,
    });
  }, [theme, editor]);
  return null;
};
