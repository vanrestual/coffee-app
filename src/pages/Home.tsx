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
};

export default function Home() {
  const [showQRCode, setshowQRCode] = useState(false);
  const [contents, setContents] = useState<ContentsType>();
  const [cookies] = useCookies(["access_token", "refresh_token", "token_type"]);
  const getContents = useCallback(async () => {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}api/home`,
        {
          method: "GET",
          headers: {
            Authorization: `${cookies.token_type} ${cookies.access_token}`,
            "Content-type": "application/json",
          },
        }
      );
      const response = await request.json();
      setContents(response.result);
    } catch (error) {
      console.log(error);
    }
  }, [cookies.access_token, cookies.token_type]);

  useEffect(() => {
    getContents();
  }, [getContents]);
  return (
    <>
      <section
        className="bg-cover bg-center px-4 py-6 md:px-5 md:py-7 2xl:px-6 2xl:md:py-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="rounded-xl bg-white p-4 shadow-lg md:p-6 2xl:p-8">
          <div className="mb-px text-sm md:text-base 2xl:text-lg">
            {contents?.greeting}
          </div>
          <div className="font-semibold md:text-lg 2xl:text-xl">
            {contents?.name}
          </div>
          <div className="mt-4 flex items-center space-x-4 md:space-x-6 2xl:space-x-8">
            <button
              className="relative inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-t border-gray-100 bg-white p-4 text-gray-500 shadow-md transition duration-300 hover:bg-gray-300/10 hover:text-gray-600 hover:shadow-none focus:outline-none md:h-24 md:w-24 md:p-5 2xl:p-6"
              onClick={() => setshowQRCode(true)}
            >
              <img className="h-full w-full" src={contents?.qrcode} alt="" />
            </button>
            <hr className="h-14 border border-dashed md:h-16 2xl:h-20" />
            <div className="flex grow flex-col justify-center space-y-2 md:space-y-2.5 2xl:space-y-3">
              <div className="flex justify-between">
                <span className="text-lg leading-8 md:text-xl md:leading-9 2xl:text-2xl 2xl:md:leading-10">
                  Saldo
                </span>
                <span className="truncate text-xl font-bold md:text-2xl 2xl:text-3xl">
                  {contents?.saldo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg leading-8 md:text-xl md:leading-9 2xl:text-2xl 2xl:md:leading-10">
                  Points
                </span>
                <span className="truncate text-xl font-semibold text-emerald-300 md:text-2xl 2xl:text-3xl">
                  {contents?.point}
                </span>
              </div>
            </div>
          </div>
          <Transition appear show={showQRCode} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={() => setshowQRCode(false)}
            >
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
                <div className="flex min-h-full items-center justify-center text-center md:px-4 2xl:px-6">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="relative flex min-h-screen w-full max-w-screen-sm transform flex-col items-center justify-center space-y-10 overflow-hidden bg-white px-6 pt-6 pb-12 text-left align-middle shadow-xl transition-all md:mr-4">
                      <button
                        className="absolute right-2 top-2 inline-flex items-center justify-center truncate rounded-xl border border-transparent p-2.5 text-sm font-medium text-gray-500 transition duration-300 hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus-visible:bg-gray-50 focus-visible:text-gray-600  focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 md:right-2.5 md:top-2.5 md:p-3 2xl:right-3 2xl:top-3 2xl:p-3.5 2xl:text-base"
                        onClick={() => setshowQRCode(false)}
                        type="button"
                      >
                        <XMarkIcon
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 md:h-6 md:w-6 2xl:h-7 2xl:w-7"
                        />
                      </button>
                      <Dialog.Title className="text-center text-lg font-semibold text-gray-800 md:text-xl 2xl:text-2xl">
                        Show the QR Code below to the cashier.
                      </Dialog.Title>
                      <img
                        className="h-full w-full max-w-[12rem] md:max-w-[14rem] 2xl:max-w-[16rem]"
                        src={contents?.qrcode}
                        alt=""
                      />
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
  );
}
