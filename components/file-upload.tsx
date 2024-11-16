"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  onFileTypeChange?: (type?: string) => void;
  fileType?: string;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
  onChange,
  onFileTypeChange,
  fileType="",
  value,
  endpoint,
}: FileUploadProps) => {
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="size-4 " />
        </button>
      </div>
    );
  }
  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="size-10 fill-indigo-200 stroke-indigo-400 " />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 break-words break-all text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={async (res) => {
        onChange(res?.[0].url);
        const fileType = (res?.[0].name).split(".").pop();
        if (onFileTypeChange) {
          console.log(fileType)

          onFileTypeChange(fileType);
        }
      }}
      onUploadError={(error) => {
        console.log(error);
      }}
    />
  );
};
