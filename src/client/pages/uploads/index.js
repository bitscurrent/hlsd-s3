"use client";


import { useState } from 'react';

export default function UploadPage() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    const file = document.getElementById('fileInput').files[0];

    formData.append('file', file);

    const response = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setMessage(result.message || result.error);
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <h2> IOIO</h2>
      <form id="uploadForm" onSubmit={handleSubmit} enctype="multipart/form-data">
        <input type="file" id="fileInput" name="file" required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
