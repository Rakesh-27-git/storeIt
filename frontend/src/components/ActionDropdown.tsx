import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { actionsDropdownItems } from "../constants";
import { Link, useRevalidator } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileDetails } from "./ActionModalContent";
import API from "../constants/services/api";

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

const ActionDropdown = ({ file }: { file: FileProps }) => {
  console.log("file", file);
  const files = file.key.split("/");
  const fileName = files[files.length - 1];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState(fileName);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<ActionItem | null>(null);

  const revalidator = useRevalidator();

  interface ActionItem {
    label: string;
    icon: string;
    value: string;
  }

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(fileName);
  };

  const deleteFile = async () => {
    try {
      const deleted = await API.delete("/file/delete", {
        data: file,
      });
      window.location.reload();
      console.log("Deleted:", deleted);
    } catch (error) {
      console.error("Failed to delete file", error);
    }
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);

    const actions: Record<string, () => Promise<void>> = {
      delete: deleteFile,
      rename: async () => console.log("Rename logic here"), // Add rename logic
      share: async () => console.log("Share logic here"), // Add share logic
      details: async () => console.log("Details logic here"), // Add details logic
    };

    if (actions[action.value]) {
      await actions[action.value]();
    }
    revalidator.revalidate();
    setIsLoading(false);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;
    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-3 md:flex-row">
          <Button onClick={closeAllModals} className="modal-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleAction} className="modal-submit-button">
            <p className="capitalize">{value}</p>
            {isLoading && (
              <img
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="animate-spin"
              />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <img src="/assets/icons/dots.svg" alt="dots" width={34} height={34} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {fileName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);
                setIsModalOpen(true);

                if (
                  ["delete", "rename", "share", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  to="https://www.google.com" // TODO: Replace with actual download URL
                  download={fileName}
                  className="flex items-center gap-2"
                >
                  <img
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
