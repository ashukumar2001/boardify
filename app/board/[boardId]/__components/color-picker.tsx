"use client";

import Hint from "@/components/hint";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { colorToCss, hexToRgb } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
  lastUsedColor: Color;
}
interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}
export const ColorPicker = ({ onChange, lastUsedColor }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[241px]">
      <Hint label="Choose color">
        <Input
          type="color"
          value={colorToCss(lastUsedColor)}
          className="w-8 h-8 rounded-md border p-0 bg-transparent"
          onChange={(e) => {
            onChange(hexToRgb(e.target.value));
          }}
        />
      </Hint>

      <Separator orientation="vertical" className="h-8" />
      <ColorButton onClick={onChange} color={{ r: 255, g: 243, b: 39 }} />
      <ColorButton onClick={onChange} color={{ r: 68, g: 142, b: 233 }} />
      <ColorButton onClick={onChange} color={{ r: 243, g: 82, b: 35 }} />
      <ColorButton onClick={onChange} color={{ r: 252, g: 82, b: 88 }} />
      <ColorButton onClick={onChange} color={{ r: 10, g: 244, b: 120 }} />
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
