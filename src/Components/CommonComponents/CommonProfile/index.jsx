import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import { t } from "i18next";
import _ from "lodash";

import CameraIcon from "../../../assets/icons/camera_icon.svg";
import UserPrfileBlack from "../../../assets/icons/UserProfileBlack";
import { getBase64Url, verifyFileExtension } from "../../../constants/utilis";

const CommonProfile = (props) => {
  const { UserID, CreatedBy, CreatedAt, image, setImage, checkProfile } = props;
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    setProfileImage(image);
  }, [image]);

  const handleImageChange = async (e) => {
    if (verifyFileExtension(e.target.files[0].type)) {
      let filecontent = await getBase64Url(e.target.files[0]);
      const fileextension = e.target.files[0].type;
      setImage({
        file_content: filecontent,
        file_extension: fileextension.substring(fileextension.indexOf("/") + 1),
        file_path: null,
      });
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    } else {
      toast.error("Invalid File Not Allowed!");
    }
  };

  console.log({ profileImage, image }, "profileImage");

  return (
    <>
      <Toaster />
      <div>
        <div className="flex px-20 space-x-7 items-center mt-4">
          {checkProfile && (
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="img-logo"
                  className="w-[100px] h-[100px] rounded-full "
                />
              ) : (
                <UserPrfileBlack className=" text-black w-[100px] h-[100px]" />
              )}
              <label
                className=" cursor-pointer absolute top-[55px] right-0 "
                for="file-upload"
              >
                <img
                  value={profileImage}
                  src={CameraIcon}
                  alt="SVG as an image"
                />
              </label>
              <input
                onChange={handleImageChange}
                className="hidden"
                id="file-upload"
                type="file"
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          )}

          <div>
            <div className="flex flex-col  text-primary_color_60 text-base">
              {UserID && <p className="font-bold">{t("user_id")}</p>}
              {CreatedBy && <p> {t("created_by")}</p>}
              {CreatedAt && <p>{t("created_at")}</p>}
            </div>
          </div>
          <div>
            <div className="flex flex-col text-primary_color_60 text-base">
              <p className="font-bold">{UserID}</p>
              <p>{CreatedBy}</p>
              <p>{CreatedAt}</p>
            </div>
          </div>
        </div>
        <div className="border-dashed border-[1px] border-[#00000029]  mt-8 w-[95%] m-auto"></div>
      </div>
    </>
  );
};

export default CommonProfile;
