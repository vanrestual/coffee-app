import { Fragment, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import background from "../assets/motif.png";
import Carousel from "../components/Carousel";

export type ContentsType = {
  banner: string[];
  greeting: string; 
  name: string;
  point: number; 
  qrcode: string;
  saldo: number;
}

export default function Home() {
  const [showQRCode, setshowQRCode] = useState(false);
  const [contents, setContents] = useState<ContentsType>();
  const [cookies] = useCookies(['access_token', 'refresh_token', 'token_type']);
  const getContents = useCallback(async () => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/home`, {
        method: "GET",
        headers: {
          "Authorization": `${cookies.token_type} ${cookies.access_token}`,
          "Content-type": "application/json"
        }
      });
      const response = await request.json();
      setContents(response.result);
    } catch (error) {
      console.log(error);
    }
  }, [cookies.access_token, cookies.token_type])

  useEffect(() => {
    getContents();
  }, [getContents])
  return (
    <>
      <section className="px-4 py-6 md:px-5 md:py-7 2xl:px-6 2xl:md:py-8 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
        <div className="bg-white rounded-xl p-4 md:p-6 2xl:p-8 shadow-lg">
          <div className="text-sm md:text-base 2xl:text-lg mb-px">{contents?.greeting}</div>
          <div className="md:text-lg 2xl:text-xl font-semibold">{contents?.name}</div>
          <div className="flex items-center space-x-4 md:space-x-6 2xl:space-x-8 mt-4">
            <button className="text-gray-500 hover:text-gray-600 bg-white hover:bg-gray-300/10 border-gray-100 inline-flex justify-center items-center focus:outline-none transition duration-300 border-t h-20 md:h-24 w-20 md:w-24 p-4 md:p-5 2xl:p-6 rounded-full relative overflow-hidden shadow-md border hover:shadow-none" onClick={() => setshowQRCode(true)}>
              <img className="w-full h-full" src={contents?.qrcode} alt="" />
            </button>
            <hr className="h-14 md:h-16 2xl:h-20 border border-dashed" />
            <div className="grow flex flex-col justify-center space-y-2 md:space-y-2.5 2xl:space-y-3">
              <div className="flex justify-between">
                <span className="text-lg leading-8 md:text-xl md:leading-9 2xl:text-2xl 2xl:md:leading-10">Saldo</span>
                <span className="text-xl md:text-2xl 2xl:text-3xl font-bold truncate">{contents?.saldo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg leading-8 md:text-xl md:leading-9 2xl:text-2xl 2xl:md:leading-10">Points</span>
                <span className="text-xl md:text-2xl 2xl:text-3xl font-semibold truncate text-emerald-300">{contents?.point}</span>
              </div>
            </div>
          </div>
          <Transition appear show={showQRCode} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setshowQRCode(false)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/50" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center md:px-4 2xl:px-6 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full relative flex space-y-10 flex-col items-center justify-center max-w-screen-sm md:mr-4 transform overflow-hidden bg-white px-6 pt-6 pb-12 text-left align-middle shadow-xl transition-all min-h-screen">
                      <button
                        className="absolute focus:outline-none truncate right-2 md:right-2.5 2xl:right-3 top-2 md:top-2.5 2xl:top-3 inline-flex justify-center items-center border border-transparent text-sm 2xl:text-base font-medium rounded-xl p-2.5 md:p-3 2xl:p-3.5  text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus-visible:text-gray-600 focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition duration-300"
                        onClick={() => setshowQRCode(false)}
                        type="button"
                      >
                        <XMarkIcon aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6 2xl:h-7 2xl:w-7 shrink-0" />
                      </button>
                      <Dialog.Title className="text-lg md:text-xl 2xl:text-2xl text-center font-semibold text-gray-800">
                        Show the QR Code below to the cashier.
                      </Dialog.Title>
                      <img className="w-full max-w-[12rem] md:max-w-[14rem] 2xl:max-w-[16rem] h-full" src={contents?.qrcode} alt="" />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </section>
      <Carousel banners={(contents as any).banner} />
    </>
  )
}
