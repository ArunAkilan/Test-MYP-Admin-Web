import React, { useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./Upload.scss";

const MAX_FILE_SIZE_MB = 2; // Limit file size to 2MB

interface UploadImageFieldProps {
  setImageData: (file: File | null) => void;
}

const UploadImageField: React.FC<UploadImageFieldProps> = ({
  setImageData,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  setImageData(image);

  const validateImage = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return "Only JPG, PNG, and GIF files are allowed.";
    }

    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      return `File size must be less than ${MAX_FILE_SIZE_MB} MB.`;
    }

    return null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateImage(file);
      if (validationError) {
        setError(validationError);
        setImage(null);
        setPreviewUrl(null);
    //         setImage(file);
    // setPreviewUrl(URL.createObjectURL(file));
    // setError(null);
    // setImageData(file);
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload image.");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!image && (
        <input type="file" accept="image/*" onChange={handleImageChange} />
      )}

      {previewUrl && (
        <div>
          <img
            src={previewUrl}
            alt="Preview"
            width={150}
            style={{ marginTop: 10 }}
          />
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={removeImage}
              style={{ marginLeft: 10 }}
              className="changeProfileBtn"
            >
              <FileUploadIcon /> Change Profile Picture
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
    </form>
  );
};

export default UploadImageField;
