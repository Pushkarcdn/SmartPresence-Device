/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd/lib";
import { RxCross1 } from "react-icons/rx";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: any;
}

const FailedModal = ({ isOpen, closeModal, title, text }: ModuleModalProps) => {
  return (
    <>
      <Modal open={isOpen} footer={null} closeIcon={null} centered>
        <div className="flex flex-col items-center py-2">
          <div className="flex flex-col items-center gap-5">
            <span className="rounded-[50%] p-2.5 bg-[#FCEEEE] text-[#E05151]">
              <RxCross1 size={25} />
            </span>
            <span className="font-semibold text-lg text-red-500">{title}</span>
          </div>

          <p className="text-center">{text}</p>

          <div className="flex gap-4 items-center text-sm mt-5">
            <div onClick={closeModal}>
              {/* <RedOutlineButton title={"Close"} /> */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FailedModal;
