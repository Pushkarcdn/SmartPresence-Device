/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/global/modals/DeleteModal";

import { CiTrash } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const ActionCard = ({ id, refetch, jobs, applications }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [detailModalStatus, setDetailModalStatus] = useState(false);

  const deleteApplication = async (id: any) => {
    await hitApi(`/job-seekers/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        <Link href={`/admin/job-seeker-accounts/${id}`}>
          <IoEyeOutline size={22} color="green" className="cursor-pointer" />
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
          title="Delete account"
          description="Are you sure you want to delete this job seeker account?"
          action={() => {
            deleteApplication(id);
            setDeleteModalStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default ActionCard;
