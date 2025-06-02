import React, { useState, useRef } from 'react';
   import axios from 'axios';

   function FileUpload() {
     const [selectedFile, setSelectedFile] = useState(null);
     const [uploadStatus, setUploadStatus] = useState('');
     const fileInputRef = useRef(null);

     const handleFileChange = (event) => {
       setSelectedFile(event.target.files[0]);
     };

     const handleButtonClick = () => {
       fileInputRef.current.click();
     };

     const handleUpload = async () => {
       if (!selectedFile) {
         setUploadStatus('Please select a file.');
         return;
       }
       setUploadStatus('Uploading...');

       const formData = new FormData();
       formData.append('file', selectedFile);

       try {
         const response = await axios.post('/upload', formData, {
           headers: {
             'Content-Type': 'multipart/form-data',
           },
         });
         if (response.status === 200) {
           setUploadStatus('File uploaded successfully!');
         } else {
           setUploadStatus('Error during file upload.');
         }
       } catch (error) {
         console.error('Error uploading file:', error);
         setUploadStatus('Error during file upload.');
       }
     };
     return (
       <div>
         <button onClick={handleButtonClick}>Upload File</button>
         <input
           type="file"
           onChange={handleFileChange}
           style={{ display: 'none' }}
           ref={fileInputRef}
         />
         {selectedFile && <p>Selected file: {selectedFile.name}</p>}
         <button onClick={handleUpload}>Upload to Server</button>
         {uploadStatus && <p>{uploadStatus}</p>}
       </div>
     );
   }

   export default FileUpload;