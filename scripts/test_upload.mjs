import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

async function run() {
  try {
    const createRes = await axios.post('http://localhost:3001/api/assessments', {});
    const id = createRes.data.data.id;
    console.log("Created:", id);

    const formData = new FormData();
    formData.append('image', Buffer.from('fake-image-data'), 'image.jpg');

    const uploadRes = await axios.post(`http://localhost:3001/api/assessments/${id}/image`, formData, {
      headers: formData.getHeaders()
    });
    console.log("Uploaded:", uploadRes.data);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}
run();
