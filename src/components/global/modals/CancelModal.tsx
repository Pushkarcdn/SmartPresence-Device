/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal } from "antd/lib";
import PasswordConfirmModal from "./PasswordConfirmModal";
import { RxCross1 } from "react-icons/rx";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: string;
  action: () => any;
}

const CancelModal = ({
  isOpen,
  closeModal,
  title,
  text,
  action,
}: ModuleModalProps) => {
  const [passwordConfirmModelStatus, setPasswordConfirmModelStatus] =
    useState(false);

  // For testing only ------
  // useEffect(() => {
  //     setPasswordConfirmModelStatus(true)
  // }, [])

  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        closeIcon={null}
        centered

        // width={800}
      >
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex flex-col items-center gap-5">
            <span className="rounded-[50%] p-2.5 bg-[#FCEEEE] text-[#E05151]">
              <RxCross1 size={25} />
            </span>
            <span className="font-medium text-lg text-red-500">{title}</span>
          </div>

          <p className="text-center">{text}</p>

          <div className="flex gap-4 items-center text-sm mt-5">
            <div onClick={closeModal}>
              {/* <SecondaryOutlineButton title={"Cancel"} /> */}
            </div>

            <div onClick={action}>
              {/* <RedPrimaryButton title={"Confirm"} /> */}
            </div>
          </div>
        </div>
      </Modal>
      {passwordConfirmModelStatus && (
        <PasswordConfirmModal
          isOpen={passwordConfirmModelStatus}
          closeModal={() => setPasswordConfirmModelStatus(false)}
        />
      )}
    </>
  );
};

export default CancelModal;
