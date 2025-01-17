/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/global/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";

const ActionCard = ({ id, refetch, jobs, applications }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [detailModalStatus, setDetailModalStatus] = useState(false);

  const deleteApplication = async (id: any) => {
    await hitApi(`/admins/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        {/* <IoEyeOutline
          size={22}
          color="green"
          className="cursor-pointer"
          onClick={() => setDetailModalStatus(true)}
        />

        <Link href={`/admin/applications/${id}`}>
          <FiEdit3 size={20} color="#0295a9" className="cursor-pointer" />
        </Link> */}

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
