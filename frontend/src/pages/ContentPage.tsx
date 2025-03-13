import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../constants/services/api";
import Card from "../components/Card";
import { getFileTypesParams } from "../lib/utils";

const ContentPage = () => {
  const { type = "" } = useParams<{ type: string }>();
  interface File {
    key: string;
    doc_type: string;
    url: string;
    name: string;
    size: number;
    created_at: string;
    [key: string]: string | number | boolean | object;
  }

  const [files, setFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const allowedTypes = getFileTypesParams(type); // Get allowed file types for the page

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await API.post("/db/getMyFiles", {
          user_id: "user_29w83sxmDNGwOuEthce5gg56FcC",
        });

        const userId = "user_29w83sxmDNGwOuEthce5gg56FcC";
        const filteredFiles = response.data.filter((file: File) =>
          allowedTypes.includes(file.doc_type)
        );

        const structuredFiles = createFolderStructure(filteredFiles);
        setFiles(structuredFiles[userId] || {});
        // Ensure it doesn't break if no files match
      } catch (err) {
        setError("Failed to fetch files.");
        console.error("Failed to fetch files", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [type, allowedTypes]);

  // Function to create folder structure from file list
  const createFolderStructure = (files: File[]) => {
    const structure: Record<string, any> = {};

    files.forEach((file) => {
      const parts = file.key.split("/");
      let current = structure;

      parts.forEach((part: string, index: number) => {
        if (index === parts.length - 1) {
          current[part] = file; // Last part is the file
        } else {
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
      });
    });

    return structure;
  };

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
      ) : Object.keys(files).length > 0 ? (
        <section className="file-list">
          {Object.keys(files).map((key) => (
            <Card key={key} file={files[key]} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default ContentPage;
