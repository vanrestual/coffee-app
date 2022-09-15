import { useState } from 'react'

export default function Carousel({ banners }: { banners: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTobanner = (bannerIndex: number) => {
    setCurrentIndex(bannerIndex);
  };
  
  const background = { backgroundImage: `url(${banners[currentIndex]})` };

  return (
    <section className="relative overflow-hidden aspect-[2/1]">
      <div className="w-full h-full bg-no-repeat bg-cover bg-center" style={background}></div>
      <div className="bg-white flex justify-center space-x-2 md:space-x-2.5 2xl:space-x-3 border-b p-4 md:p-5 2xl:p-6">
        {banners.map((_src, bannerIndex) => (
          <div
            className="cursor-pointer h-2 2xl:h-3 md:h-2.5 w-2 md:w-2.5 2xl:w-3 rounded-full shadow bg-gray-800"
            key={bannerIndex}
            onClick={() => goTobanner(bannerIndex)}
          />
        ))}
      </div>
    </section>
  )
}
