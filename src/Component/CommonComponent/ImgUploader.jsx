import React, { useState } from 'react';

const ImageUploader = ({handleImageUpload,selectedImage}) => {
 

  return (
    <div className="d-inline-block position-relative">
      <input
        type="file"
        accept="image/*"
        id="file-input"
        className="d-none"
        onChange={handleImageUpload}
      />
      <label
        htmlFor="file-input"
        className="d-flex justify-content-center align-items-center rounded-circle bg-light border border-secondary"
        style={{ width: '70px', height: '70px', cursor: 'pointer' }}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="img-fluid rounded-circle"
            style={{ width: '70%', height: '70%' }}
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833281.png"
            alt="upload"
            className="img-fluid"
            style={{ width: '40px', height: '40px' }}
          />
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
