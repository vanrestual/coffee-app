import type { FC } from "react";
import clsx from "clsx";

export type Props = {
  slides: Array<string>,
  activeSlide: number;
};

const Dots: FC<Props> = ({ slides, activeSlide }) => (
  <div className="absolute w-full flex justify-center items-center bottom-6 space-x-2">
    {slides.map((slide, i) => (
      <span className={clsx(activeSlide === i ? "bg-black" : "bg-white", "p-2.5 cursor-pointer rounded-full")} key={slide} />
    ))}
  </div>
);

export default Dots;
