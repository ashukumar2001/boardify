"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}
interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}
export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div
      className="
    flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200
  "
    >
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 255 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 243, b: 39 }} />
      <ColorButton onClick={onChange} color={{ r: 68, g: 142, b: 233 }} />
      <ColorButton onClick={onChange} color={{ r: 243, g: 82, b: 35 }} />
      <ColorButton onClick={onChange} color={{ r: 252, g: 82, b: 88 }} />
      <ColorButton onClick={onChange} color={{ r: 10, g: 244, b: 120 }} />
      <ColorButton onClick={onChange} color={{ r: 52, g: 98, b: 135 }} />
    </div>
  );
};

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border"
        style={{ background: colorToCss(color) }}
      ></div>
    </button>
  );
};
