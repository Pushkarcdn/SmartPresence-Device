/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/global/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsArrowsFullscreen } from "react-icons/bs";

const ApplicationsActionCard = ({ item, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [detailModalStatus, setDetailModalStatus] = useState(false);

  const deleteApplication = async (id: any) => {
    await hitApi(`/applications/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        <IoEyeOutline
          size={22}
          color="green"
          className="cursor-pointer"
          onClick={() => setDetailModalStatus(true)}
        />

        <Link href={`/admin/applications/${item?.id}`}>
          <BsArrowsFullscreen
            size={15}
            color="#0295a9"
            className="cursor-pointer mt-0.5"
          />
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
          title="Delete application"
          description="Are you sure you want to delete this application?"
          action={() => {
            deleteApplication(item?.id);
            setDeleteModalStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default ApplicationsActionCard;
