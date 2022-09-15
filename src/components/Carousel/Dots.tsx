import type { FC } from "react";
import clsx from "clsx";

export type Props = {
  slides: Array<string>;
  activeSlide: number;
};

const Dots: FC<Props> = ({ slides, activeSlide }) => (
  <div className="absolute bottom-6 flex w-full items-center justify-center space-x-2">
    {slides.map((slide, i) => (
      <span
        className={clsx(
          activeSlide === i ? "bg-black" : "bg-white",
          "cursor-pointer rounded-full p-2.5"
        )}
        key={slide}
      />
    ))}
  </div>
);

export default Dots;
