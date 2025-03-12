import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../constants/services/api";
import Card from "../components/Card";

const ContentPage = () => {
  const { type } = useParams<{ type: string }>();
  const [files, setFiles] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await API.post("/db/getMyFiles", {
          user_id: "user_29w83sxmDNGwOuEthce5gg56FcC",
        });

        const structuredFiles = createFolderStructure(response.data);
        setFiles(structuredFiles);
      } catch (err) {
        setError("Failed to fetch files.");
        console.error("Failed to fetch files", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [type]);

  // Function to create folder structure from file list
  const createFolderStructure = (files: any[]) => {
    const structure: Record<string, any> = {};

    files.forEach((file) => {
      const parts = file.key.split("/");
      let current = structure;

      parts.forEach((part: string, index: number) => {
        if (index === parts.length - 1) {
          // Last part, assign the file object
          current[part] = file;
        } else {
          // Create nested folder if it doesn't exist
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
      });
    });

    return structure;
  };

  console.log(files);

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            {/* <Sort /> */}
          </div>
        </div>
      </section>

      {error ? (
        <p className="error-message">{error}</p>
      ) : loading ? (
        <p className="loading-message">Loading files...</p>
      ) : files.length > 0 ? (
        <section className="file-list">
          {files.map((file) => (
            <Card key={file.name} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default ContentPage;
