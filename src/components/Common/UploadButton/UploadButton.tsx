import React, { useRef, useState } from 'react';
import axios from 'axios';
import GenericButton from '../Button/button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import './Upload.scss'

const SingleButtonUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('Upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Error during file upload.');
    }
  };

  return (
    <div>
     
      <button onClick={handleButtonClick} className='changeProfileBtn'><FileUploadIcon/> Change Profile Picture</button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default SingleButtonUpload;