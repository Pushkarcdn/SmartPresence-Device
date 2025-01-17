/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/global/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";
import { BsReply } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";

const InquiriesActionCard = ({ item, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const deleteItem = async (id: any) => {
    await hitApi(`/job-seeker-support/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center  text-sm font-semibold">
      <div className="flex items-start gap-6">
        <Link href={`mailto:${item?.jobSeeker?.email}`} target="_blank">
          <BsReply size={22} color="#0295a9" />
        </Link>

        <Link href={`/admin/job-seeker-support/${item?.id}`}>
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
          title="Delete inquiry"
          description="Are you sure you want to delete this inquiry?"
          action={() => {
            deleteItem(item?.id);
            setDeleteModalStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default InquiriesActionCard;
