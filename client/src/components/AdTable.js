import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdTable = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({ title: '', description: '', otherParams: '' });
  const [prompt, setPrompt] = useState({ titlePrompt: '', descriptionPrompt: '' });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('/api/ads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAds(response.data);
    } catch (error) {
      console.error('Failed to fetch ads:', error.response ? error.response.data : error.message);
      alert('Failed to fetch ads. Please try again later.');
    }
  };

  const handleGenerateText = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post('/api/chat/generate-ad-text', prompt, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setNewAd({ ...newAd, title: response.data.title, description: response.data.description });
    } catch (error) {
      console.error('Failed to generate text:', error.response ? error.response.data : error.message);
      alert('Failed to generate text. Please try again later.');
    }
  };

  const handleCreateAd = async () => {
    if (!newAd.title || !newAd.description) {
      return alert('Title and description are required');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.post('/api/ads', newAd, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchAds();
      setNewAd({ title: '', description: '', otherParams: '' });
    } catch (error) {
      console.error('Failed to create ad:', error.response ? error.response.data : error.message);
      alert('Failed to create ad. Please try again later.');
    }
  };

  const handleDeleteAd = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`/api/ads/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchAds();
    } catch (error) {
      console.error('Failed to delete ad:', error.response ? error.response.data : error.message);
      alert('Failed to delete ad. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Manage Your Ads</h2>
      <input
        type="text"
        placeholder="Title"
        value={newAd.title}
        onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newAd.description}
        onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Other Params"
        value={newAd.otherParams}
        onChange={(e) => setNewAd({ ...newAd, otherParams: e.target.value })}
      />
      <button onClick={handleCreateAd}>Create Ad</button>

      <h3>Generate Ad Content using ChatGPT</h3>
      <input
        type="text"
        placeholder="Enter title prompt"
        value={prompt.titlePrompt}
        onChange={(e) => setPrompt({ ...prompt, titlePrompt: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter description prompt"
        value={prompt.descriptionPrompt}
        onChange={(e) => setPrompt({ ...prompt, descriptionPrompt: e.target.value })}
      />
      <button onClick={handleGenerateText}>Generate Text</button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.title}</td>
              <td>{ad.description}</td>
              <td>
                <button onClick={() => handleDeleteAd(ad.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdTable;

