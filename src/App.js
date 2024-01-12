import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [instagramUrl, setInstagramUrl] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);

  const handleDownload = async () => {
    try {
      const response = await axios.get('https://instagram-post-reels-stories-downloader.p.rapidapi.com/instagram/', {
        params: {
          url: instagramUrl,
        },
        headers: {
          'X-RapidAPI-Key': '2e73cdcb16msh70618548fca142cp1efad3jsn9e454aa3715f',
          'X-RapidAPI-Host': 'instagram-post-reels-stories-downloader.p.rapidapi.com',
        },
      });
      setDownloadLinks(response.data.result);
    } catch (error) {
      console.error(error);
      setDownloadLinks([]);
    }
  };

  const handleDownloadClick = (url) => {
    // Perform any logic you need before initiating the download
    window.open(url, '_blank');
  };

  return (
    <div className='center'>
      <h1>Instagram Reel Downloader</h1>
      <input
        type="text"
        placeholder="Enter Instagram Reel URL"
        value={instagramUrl}
        onChange={(e) => setInstagramUrl(e.target.value)}
        className='styled-input'
      />
      <button onClick={handleDownload}>Download</button>
      {downloadLinks.length > 0 && (
        <div>

          {downloadLinks.map((link, index) => (
            <div key={index} className='download-link-item'>
              
              <p>Type: {link.type}</p>
              <p>Size: {link.size}</p>
              <img
                  src={link.thumb}
                  alt="Thumbnail"
                  style={{ width: '100px', height: '150px',boxSizing:'border-box',alignItems:'center'}} // Set the width and height
                />
              
             <p><button onClick={() => handleDownloadClick(link.url)}>Download</button></p> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
