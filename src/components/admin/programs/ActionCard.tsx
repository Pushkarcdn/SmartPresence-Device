/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/global/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";

const ActionCard = ({ id, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const deleteProgram = async () => {
    await hitApi(`/programs/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        <Link href={`/programs/${id}`}>
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
          title="Delete program"
          description="Are you sure you want to delete this program ?"
          action={deleteProgram}
        />
      )}
    </div>
  );
};

export default ActionCard;
