import React from "react";

const ProfileImage = ({ fullName }: { fullName: string }) => {
  if (!fullName) return "NA";

  const firstName = fullName.split(" ")[0] as string;
  const lastName = fullName.split(" ").at(-1) as string;

  return (
    <div className="w-11 aspect-square bg-[#606060] rounded-full flex items-center justify-center">
      <p className="text-white text-base">
        {firstName.charAt(0).toUpperCase()}
        {lastName.charAt(0).toUpperCase()}
      </p>
    </div>
  );
};

export default ProfileImage;
