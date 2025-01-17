/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd/lib";
import { IoCheckmarkCircle } from "react-icons/io5";
import { PrimaryButton, PrimaryOutlineButton } from "../buttons/Buttons";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: string;
  action: any;
}

const ConfirmModal = ({
  isOpen,
  closeModal,
  title,
  text,
  action,
}: ModuleModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
      width={500}
    >
      <div className="flex flex-col items-center gap-5 py-2">
        <div className="flex flex-col items-center gap-1">
          <span className="rounded-[50%] p-3 bg-[#EDFFEA] text-[#4DE95C]">
            <IoCheckmarkCircle size={32} />
          </span>
          <span className="font-medium text-lg">{title}</span>
        </div>

        <p className="text-center">{text}</p>

        <div className="flex gap-4 items-center text-sm">
          <div onClick={closeModal}>
            <PrimaryOutlineButton title={"Cancel"} />
          </div>

          <PrimaryButton title={"Confirm"} action={action} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
