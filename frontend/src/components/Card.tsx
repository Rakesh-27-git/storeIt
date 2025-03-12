import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";


const Card = ({ file }: { file: Models.Document }) => {
  console.log("file", file);
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
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
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
