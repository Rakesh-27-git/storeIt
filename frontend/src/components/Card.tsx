import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize } from "../lib/utils";
import ActionDropdown from "./ActionDropdown";

interface File {
  key: string;
  doc_type: string;

  url: string;
  name: string;
  size: number;
  created_at: string;
  $updatedAt: string; // TODO: Remove this
  [key: string]: string | number;
}

interface CardProps {
  file: File;
}

const Card = ({ file }: CardProps) => {
  const files = file.key.split("/");
  const fileName = files[files.length - 1];
  const fileInfo = file.doc_type.split("/");
  const extension = fileInfo[1];
  const type = fileInfo[0];

  return (
    <Link to={file.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={type}
          extension={extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{fileName}</p>
        <FormattedDateTime
          date={file.created_at}
          className="body-2 text-light-100"
        />
        {/* <p className="caption line-clamp-1 text-light-200">
          By: {file.owner.fullName}
        </p> */}
      </div>
    </Link>
  );
};

export default Card;
