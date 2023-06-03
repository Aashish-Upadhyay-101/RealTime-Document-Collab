import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { PopoverDemo } from "restrictify/components/ui/Popover";
import { FiAperture } from "react-icons/fi";

declare global {
  interface Window {
    my_modal_5: {
      showModal: () => void;
    };
  }
}

import "./globals.css";
import { Modal } from "restrictify/components/ui/Modal";

export default function Home() {
  const showModal = () => {
    window.my_modal_5.showModal();
  };
  return (
    <div className="">
      <Modal />
      <PopoverDemo>
        <button
          className="h-9 w-9 rounded-full inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
          aria-label="Update dimensions"
        >
          <MixerHorizontalIcon />
        </button>
      </PopoverDemo>

      <h1 className="text-yellow-500 font-bold text-5xl">hello world</h1>
      <FiAperture className="text-8xl text-red-800 fill-violet9 stroke-3" />

      <button className="btn" onClick={showModal}>
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
