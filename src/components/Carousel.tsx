import { useState } from "react";

export default function Carousel({ banners }: { banners: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTobanner = (bannerIndex: number) => {
    setCurrentIndex(bannerIndex);
  };

  const background = { backgroundImage: `url(${banners[currentIndex]})` };

  return (
    <section className="relative aspect-[2/1] overflow-hidden">
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat"
        style={background}
      ></div>
      <div className="flex justify-center space-x-2 border-b bg-white p-4 md:space-x-2.5 md:p-5 2xl:space-x-3 2xl:p-6">
        {banners.map((_src, bannerIndex) => (
          <div
            className="h-2 w-2 cursor-pointer rounded-full bg-gray-800 shadow md:h-2.5 md:w-2.5 2xl:h-3 2xl:w-3"
            key={bannerIndex}
            onClick={() => goTobanner(bannerIndex)}
          />
        ))}
      </div>
    </section>
  );
}
