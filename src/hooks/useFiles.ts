import { useCallback, useState } from "react";

export function useFiles() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileRemove = useCallback((file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  }, []);

  return {
    files,
    handleFileUpload,
    handleFileRemove,
  };
}
