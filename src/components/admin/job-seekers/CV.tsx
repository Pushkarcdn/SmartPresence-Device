/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

import { LuCloudUpload } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsViewList } from "react-icons/bs";
import UploadCVModal from "@/components/global/modals/UploadCVModal";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/global/ui/Loader";
import { formatDate } from "@/utils/dateFormatters";
import hitApi from "@/lib/axios";
import Link from "next/link";
import { getFileUrl } from "@/config";
import Image from "next/image";

// {
//   label: (
//     <a
//       href="https://www.antgroup.com"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex items-center gap-3 min-w-28"
//     >
//       <FiEdit size={15} />
//       <span>Edit</span>
//     </a>
//   ),
//   key: "2",
// },

function CV({ id }: any) {
  const [uploadModalStatus, setUploadModalStatus] = useState(false);

  const { data: cvs, fetchData } = useFetch(`/user-cvs/${id}`);

  const deleteItem = async (id: string) => {
    try {
      await hitApi(`/cvs/${id}`, "DELETE");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (!cvs) return <Loader />;

  return (
    <div className="w-full flex flex-col gap-5 ">
      {cvs.length === 0 && (
        <div className="my-10 w-full flex flex-col gap-1 justify-center items-center font-semibold text-gray-500 text-xl">
          No CVs uploaded yet!
        </div>
      )}

      {cvs.length > 0 && (
        <>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-5 text-nowrap">
            <p className="text-xl flex-grow text-[#DEAD00] font-bold">CVs</p>
            {/* <button className="hover:bg-primary text-[#323232] font-medium border-2 hover:text-white hover:border-primary transition py-3 px-8 rounded-lg">
          Download all
        </button> */}

            {/* <button
              onClick={() => setUploadModalStatus(true)}
              className="bg-primary hover:bg-darkGreen text-white font-medium hover:text-white hover:border-primary transition py-3 px-8 rounded-lg flex items-center justify-center gap-3"
            >
              <LuCloudUpload size={22} className="inline-block" />
              <span>Upload</span>
            </button> */}
          </div>

          {/* <hr /> */}

          <div className="w-full overflow-x-auto scrollbar">
            <table className="rounded-lg w-full ">
              <thead>
                <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                  {/* <th className="px-4 py-3 text-left font-medium">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-5 h-5 text-primary focus:ring-0 bg-gray-100 border-0 rounded-md "
                />
              </th> */}
                  <th className="px-2 py-2 text-left font-medium">File name</th>
                  <th className="px-2 py-2 text-left font-medium">
                    Description
                  </th>
                  {/* <th className="px-2 py-2 text-left font-medium">File size</th> */}
                  <th className="px-2 py-2 text-left font-medium">
                    Date uploaded
                  </th>
                  <th className="px-2 py-2 text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-nowrap">
                {cvs?.map((item: any, index: number) => {
                  const items: MenuProps["items"] = [
                    {
                      label: (
                        <Link
                          href={getFileUrl(item?.link)}
                          target="_blank"
                          className="flex items-center gap-3 min-w-28"
                        >
                          <BsViewList size={15} />
                          <span>View</span>
                        </Link>
                      ),
                      key: "0",
                    },
                    // {
                    //   label: (
                    //     <Link
                    //       href={getFileUrl(item?.link)}
                    //       target="_blank"
                    //       className="flex items-center gap-3 min-w-28"
                    //     >
                    //       <DownloadOutlined size={15} />
                    //       <span>Download</span>
                    //     </Link>
                    //   ),
                    //   key: "1",
                    // },
                    // {
                    //   label: <hr />,
                    //   key: "1",
                    // },
                    // {
                    //   label: (
                    //     <button
                    //       onClick={() => {
                    //         deleteItem(item.id);
                    //       }}
                    //     >
                    //       {/* <hr /> */}
                    //       <div className="flex items-center gap-3 min-w-28 mt-2 text-red-600 hover:text-red-600">
                    //         <DeleteOutlined size={15} />
                    //         <span>Delete</span>
                    //       </div>
                    //     </button>
                    //   ),
                    //   key: "2",
                    // },
                  ];

                  return (
                    <tr key={index}>
                      {/* <td className="border-t pl-4 py-5 text-left">
                    {" "}
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-5 h-5 text-primary focus:ring-0 bg-gray-100 border-0 rounded-md "
                    />
                  </td> */}

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500 min-w-44">
                        {item?.fileName}
                      </td>

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {item?.description || "NA"}
                      </td>

                      {/* <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                    300KB
                          </td> */}

                      <td className="border-t px-2 py-5 text-left text-sm text-gray-500">
                        {formatDate(item?.createdAt)}
                      </td>

                      <td className="border-t px-2 py-5 text-center text-sm text-gray-500">
                        <Dropdown menu={{ items }} trigger={["hover"]}>
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              <TbDotsVertical
                                size={20}
                                className="cursor-pointer"
                              />
                            </Space>
                          </a>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {uploadModalStatus && (
        <UploadCVModal
          isOpen={uploadModalStatus}
          closeModal={() => setUploadModalStatus(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default CV;
