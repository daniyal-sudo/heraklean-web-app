import React, { useState } from 'react';
import { LuUpload } from "react-icons/lu";

const UploadButton = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="col-6 mb-3 upload-buttons">
      <label htmlFor="upload" className="form-label">Upload picture</label>
      <div className="upload-box">
        <input
          type="file"
          id="upload"
          className="form-control upload-input"
          onChange={handleFileChange}
        />
        <label htmlFor="upload" className="upload-label">
          <div className="upload-icon">
        <LuUpload />
        </div>
          <span>Upload</span>
        </label>
      </div>
    </div>
  );
};

export default UploadButton;
