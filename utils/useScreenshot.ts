// Adapted from https://github.com/vre2h/use-react-screenshot/blob/master/src/index.js
// but using html2canvas-pro for its upgrades

import { useState } from "react";
import html2canvas, { Options } from "html2canvas-pro";

export const useScreenshot = ({
  type,
  quality,
}: {
  type?: "image/jpeg" | "image/png";
  quality?: number;
} = {}): [
  string | null,
  (ref: HTMLDivElement, options?: Partial<Options>) => Promise<string | void>,
  Object,
] => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState(null);

  const takeScreenShot = (
    node: HTMLElement,
    options: Partial<Options> = {
      backgroundColor: "rgba(0,0,0,0)",
      removeContainer: true,
    },
  ) => {
    if (!node) {
      throw new Error("You should provide correct html node.");
    }
    return html2canvas(node, options)
      .then((canvas) => {
        const croppedCanvas = document.createElement("canvas");
        const croppedCanvasContext = croppedCanvas.getContext("2d");

        const cropPositionTop = 0;
        const cropPositionLeft = 0;
        const cropWidth = canvas.width;
        const cropHeight = canvas.height;

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        croppedCanvasContext?.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop,
        );

        const base64Image = croppedCanvas.toDataURL(type, quality);

        setImage(base64Image);
        return base64Image;
      })
      .catch(setError);
  };

  return [image, takeScreenShot, { error }];
};
