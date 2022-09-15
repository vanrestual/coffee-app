import type { FC, HTMLAttributes } from "react";

export type Props = {
  // translate: number,
  // transition: number,
  // width: number,
  // translate, transition, width,
} & HTMLAttributes<HTMLDivElement>;

const SliderContent: FC<Props> = ({ ...props }) => (
  <div className="flex h-full" {...props} />
  // transform: translateX(-${translate}px);
  // transition: transform ease-out ${transition}s;
  // width: ${width}px;
);

export default SliderContent;
