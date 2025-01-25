/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/global/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import config from "@/config";

const ActionCard = ({ id, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const deleteRegisteredImage = async (id: string) => {
    try {
      await fetch(`${config.PYTHON_BE_URL}/api/delete-face/${id}`, {
        method: "DELETE",
      });
    } catch (error: any) {
      console.error("Error deleting image from Python-BE:", error);
    }
  };

  const deleteUser = async () => {
    const res = await hitApi(`/users/${id}`, `DELETE`);

    if (res.success) {
      await deleteRegisteredImage(id);
    }

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        <Link href={`/enrollments/${id}`}>
          <FiEdit3 size={20} color="#0295a9" className="cursor-pointer" />
        </Link>

        <CiTrash
          size={20}
          color="red"
          onClick={() => {
            setDeleteModalStatus(true);
          }}
          className="cursor-pointer"
        />
      </div>

      {deleteModalStatus && (
        <DeleteModal
          isOpen={deleteModalStatus}
          closeModal={() => setDeleteModalStatus(false)}
          title="Unenroll person ?"
          description="Are you sure you want to unenroll this person ?"
          action={deleteUser}
        />
      )}
    </div>
  );
};

export default ActionCard;
