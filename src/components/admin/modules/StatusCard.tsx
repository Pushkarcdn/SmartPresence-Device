export const StatusCard = ({ status }: { status: string }) => {
  return (
    <div className="text-center flex items-center justify-start text-nowrap font-medium text-xs">
      {status === "HIRED" && (
        <span className="text-green-500 bg-green-100 py-1.5 px-3 rounded-full ">
          {/* •  */}
          Hired
        </span>
      )}
      {status === "PENDING" && (
        <span className="text-active bg-yellow-50 py-1.5 px-3 rounded-full ">
          Pending
        </span>
      )}
      {status === "REJECTED" && (
        <span className="text-red-500 bg-red-100 py-1.5 px-3 rounded-full ">
          Rejected
        </span>
      )}
      {status === "SHORTLISTED" && (
        <span className="text-blue-500 bg-blue-100 py-1.5 px-3 rounded-full ">
          Shortlisted
        </span>
      )}
      {status === "INTERVIEWING" && (
        <span className="text-blue-500 bg-blue-100 py-1.5 px-3 rounded-full ">
          Interviewing
        </span>
      )}
      {status === "INTERVIEWED" && (
        <span className="text-blue-500 bg-blue-100 py-1.5 px-3 rounded-full ">
          Interviewed
        </span>
      )}
    </div>
  );
};

export default StatusCard;
