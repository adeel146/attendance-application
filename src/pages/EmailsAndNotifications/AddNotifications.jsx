import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import { EditorState } from "draft-js";
import { t } from "i18next";

import "./EditorStyle.css";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import { addNotification } from "../../services/EmailNotificationServices";

const schema = yup.object().shape({
  name: yup.string().required(),
  subject: yup.string().required(),
  content: yup.string().required(),
  // unique_name: yup.string(),
  is_active: yup.boolean(),
});

function AddNotifications() {
  const params = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const watchDescription = watch("description");

  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    return setValue(
      "description",
      draftToHtml(convertToRaw(editorState?.getCurrentContent()))
    );
  };

  const { mutate: addEmail, isLoading } = useMutation({
    mutationFn: (data) => {
      return addNotification(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  function generateUniqueName(name) {
    if (name) {
      const unique = name.toLowerCase().replace(/[^A-Z0-9]+/gi, ".");
      return unique;
    }
  }

  const onSubmit = (formData) => {
    const getUniqueName = generateUniqueName(formData?.name);
    const body = {
      name: formData.name,
      subject: formData.subject,
      is_active: formData.is_active,
      description: formData.description,
      content: formData.content,
      unique_name: getUniqueName,
    };

    console.log(body, "body");
    addEmail(body);
  };

  return (
    <>
      {/* {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[100vh] ">
          {customSpinner()}
        </div>
      ) : ( */}
      <div className="p-10">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  ">
          {/* profile information starting  */}
          <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          />

          {/* student-form */}
          <div className=" text-primary_color px-[8em] mt-[2em]">
            <h2 className="text-lg font-bold capitalize ">
              Email and Notifications
            </h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className=" flex  flex-wrap">
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label="Message Title"
                        placeholder="Enter Message Title"
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="subject"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label="Subject"
                        placeholder="Enter Subject"
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label="Content"
                        placeholder="Enter Content"
                      />
                    )}
                  />
                </div>
                <div className="w-[20%] mt-10 flex space-x-4 ml-4 items-center ">
                  <Controller
                    name="is_active"
                    control={control}
                    errors={errors}
                    render={({ field }) => (
                      <CustomCheckBox
                        {...field}
                        label="Active"
                        error={errors}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mt-6 border w-full ">
                <Editor
                  editorState={editorState}
                  toolbar={toolbarOptions}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
              <div className="flex justify-end my-10">
                <CommonButton
                  onClick={() => navigate(-1)}
                  className="mr-2"
                  text="Cancel"
                  width="10%"
                />
                <CommonButton type="submit" text="save" width="10%" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}

      <Toaster />
    </>
  );
}

export default AddNotifications;

const toolbarOptions = {
  options: ["blockType", "inline", "list", "link", "image"],
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
  },
  inline: {
    inDropdown: false,
    className: "inline-cutome-class",
    options: ["bold", "underline", "strikethrough", "italic"],
  },

  list: {
    inDropdown: true,
    className: "inline-option",
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
  },

  link: {
    inDropdown: true,
    className: "tool-bar-link",
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link"],
  },
  image: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    uploadEnabled: false,
    alignmentEnabled: false,
    previewImage: true,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg,.pdf",
    alt: { present: true, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
};
