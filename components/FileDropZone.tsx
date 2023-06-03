import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        padding: 1,
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileDropZone;
