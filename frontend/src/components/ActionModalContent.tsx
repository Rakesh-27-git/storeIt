import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize, formatDateTime } from "../lib/utils";

interface FileProps {
  key: string;
  doc_type: string;
  url: string;
  name: string;
  size: number;
  created_at: string;
  $updatedAt: string; // TODO: Remove this
  [key: string]: string | number | boolean | object;
}

const processFile = (file: FileProps) => {
  const files = file.key.split("/");
  const fileName = files[files.length - 1];
  const fileInfo = file.doc_type.split("/");
  const extension = fileInfo[1];
  const type = fileInfo[0];
  return { fileName, extension, type };
};

const ImageThumbnail = ({
  file,
  fileName,
  type,
  extension,
}: {
  file: FileProps;
  fileName: string;
  type: string;
  extension: string;
}) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail type={type} extension={extension} url={file.url} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{fileName}</p>
        <FormattedDateTime date={file.created_at} className="caption" />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="file-details-label text-left">{label}</p>
    <p className="file-details-value text-left">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: FileProps }) => {
  const { fileName, extension, type } = processFile(file);
  return (
    <>
      <ImageThumbnail
        file={file}
        fileName={fileName}
        type={type}
        extension={extension}
      />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        {/* <DetailRow label="Owner:" value={file.owner.fullName} /> */} 
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

// interface Props {
//   file: FileProps;
//   onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
//   onRemove: (email: string) => void;
// }

// export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
//   const { fileName, type, extension } = processFile(file);
//   return (
//     <>
//       <ImageThumbnail
//         file={file}
//         fileName={fileName}
//         type={type}
//         extension={extension}
//       />
//       <div className="share-wrapper">
//         <p className="subtitle-2 pl-1 text-light-100">
//           Share file with other users
//         </p>
//         <Input
//           type="email"
//           placeholder="Enter email address"
//           onChange={(e) => onInputChange(e.target.value.trim().split(","))}
//           className="share-input-field"
//         />
//         <div className="pt-4">
//           <div className="flex justify-between">
//             <p className="subtitle-2 text-light-100">Shared with</p>
//             <p className="subtitle-2 text-light-200">
//               {file.users.length} users
//             </p>
//           </div>
//           <ul className="pt-2">
//             {file.users.map((email: string) => (
//               <li
//                 key={email}
//                 className="flex items-center justify-between gap-2"
//               >
//                 <p className="subtitle-2">{email}</p>
//                 <Button
//                   onClick={() => onRemove(email)}
//                   className="share-remove-user"
//                 >
//                   <img
//                     src="/assets/icons/remove.svg"
//                     alt="Remove"
//                     width={24}
//                     height={24}
//                     className="remove-icon"
//                   />
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };
