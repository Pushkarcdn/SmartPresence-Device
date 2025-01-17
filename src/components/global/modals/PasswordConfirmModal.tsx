import React from "react";
import { Modal } from "antd/lib";
import { IoIosWarning } from "react-icons/io";
import { PrimaryButton, PrimaryOutlineButton } from "../buttons/Buttons";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const PasswordConfirmModal = ({ isOpen, closeModal }: ModuleModalProps) => {
  return (
    <Modal open={isOpen} footer={null} closeIcon={null} centered width={600}>
      <div className="w-full flex flex-col items-center gap-5 py-2">
        <div className="flex flex-col items-center gap-1">
          <span className="rounded-[50%] p-3 bg-[#FCEEEE] text-[#E05151]">
            <IoIosWarning size={32} />
          </span>
          <span className="font-medium text-lg">Password confirmation</span>
        </div>

        <p className="text-center">
          You need to confirm your password to delete account
        </p>

        <input
          type="password"
          className="border-2 rounded-md py-2 items-center px-3 text-sm outline-none flex w-80"
          placeholder="***************"
        />

        <div className="flex gap-4 items-center text-sm">
          <div onClick={closeModal}>
            <PrimaryOutlineButton title={"Cancel"} />
          </div>

          <PrimaryButton title={"Confirm"} />
        </div>
      </div>
    </Modal>
  );
};

export default PasswordConfirmModal;
