import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { cn, convertFileToUrl, getFileType } from "../lib/utils";
import Thumbnail from "./Thumbnail";
import API from "../constants/services/api";
import { toast } from "sonner";
import { Button } from "./ui/button";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > 50 * 1024 * 1024) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast("File size should be less than 50MB.");
      }

      return uploadFile(file).then((uploadedFile) => {
        if (uploadedFile) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
        }
        window.location.reload();
      });
    });

    await Promise.all(uploadPromises);
  }, []);

  const uploadFile = async (file: File) => {
    try {
      // Step 1: Get Presigned URL
      const { data: presignData } = await API.post("/file/upload", {
        key: file.name,
        size: file.size.toString(),
        doc_type: file.type,
        user_id: "user_29w83sxmDNGwOuEthce5gg56FcC", // Replace with actual user ID
      });

      if (!presignData.url) throw new Error("Failed to get presigned URL.");

      // Step 2: Upload File to S3
      await axios.put(presignData.url, file, {
        headers: { "Content-Type": file.type },
      });

      // Step 3: Confirm Upload in DB
      const data = await API.post("/file/upload/confirm", {
        key: file.name,
        size: file.size.toString(),
        doc_type: file.type,
        user_id: "user_29w83sxmDNGwOuEthce5gg56FcC",
      });

      console.log("File uploaded successfully", data.data);
      return true; // Indicating success
    } catch (error) {
      console.error("Failed to upload file", error);

      toast("Failed to upload file");

      return false;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button",)}>
        <img
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />{" "}
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="preview-item-name">
                    {file.name}
                    <img
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                    />
                  </div>
                </div>

                <img
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
