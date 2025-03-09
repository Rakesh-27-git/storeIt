import { useParams } from "react-router-dom";

// type Props = {};

const ContentPage = () => {
  const { type } = useParams();

  const pageTitles: Record<string, string> = {
    documents: "Documents",
    images: "Images",
    media: "Media",
    others: "Others",
  };
  return (
    <div>
      <h1>{pageTitles[type as keyof typeof pageTitles] || "Page Not Found"}</h1>
      {/* Render the respective content here */}
    </div>
  );
};

export default ContentPage;
