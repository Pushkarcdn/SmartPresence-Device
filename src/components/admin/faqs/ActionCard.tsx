/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/global/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const ActionCard = ({ id, data, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [detailModalStatus, setDetailModalStatus] = useState(false);

  const deleteItem = async (id: any) => {
    await hitApi(`/faqs/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        <Link href={`/admin/faqs/${id}`}>
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
          title="Delete faq"
          description="Are you sure you want to delete this faq?"
          action={() => {
            deleteItem(id);
            setDeleteModalStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default ActionCard;
