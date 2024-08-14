"use client";

import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const Room = () => {
  const playerRef = useRef(null);
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=LXb3EKWsInQ');
  const [inputUrl, setInputUrl] = useState('https://hlsd-bucket-test.s3.ap-southeast-2.amazonaws.com/Screenshot%20from%202024-08-11%2015-24-48.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIgE3vqRkBRdo%2By%2BMo%2BR6zpIDLlyUdz2Va%2FXIhJ52MM5bYCIQDsXlq%2BrM%2B9j6xrZGT53rFRq7k5PaybcRRPGiPgM1xGwyrtAgi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYyNjYzNTQyNjY5MCIMyObQRdTV%2FZ9HnzxVKsECYTAq1GWe2%2FSjMMPdF4zZYDq0JXrN3V%2Fa6sI5sEcgoEO6F%2F1gmuiMh58rcyz%2FIxTc4JSMsSUPvGr8bvqggt954hvlIZe6XTUcG6nJNk1XVoyGhkUzDALoyc3kbTOVFFdZHx2y0l6r4SyyhKexHRAr0BeXtptg5TNPR641wlJthK9OS09llkGsCDpF0A1NNHBrXTAlgBJQd5YIg4yy%2FClLQI1yimgF7KU52sPkBLypbkGnVxh8PLo5%2FS%2F%2F2HYLnH2RzLdFLprr%2B7Nvbl0auVIudqvLEg%2FG0sLZCHCE%2F3IeokQkxYaAeFdnC6Fi46LmND8EXPJiDVrdSw3fD%2BNHCKh4XRVBwuw22H7IgAsZCEMohqa3Wy9X1Qs83sS%2BUgEUeuQssRKRg%2FfoKStBUizXa8gYvQXWgzyY9uIGwvtwDxPztKUtMKaC8bUGOrMC9wWLTP7lPBDtH6WkdSAwhesBsNGB%2BCTjDMJLpDA%2BbSbkr2ZRILTfnRcEnkkilUpztzqXERkLEARIuTSwHubYR9H5iYMtN57CE5ljznyZ0ESYRm%2FAXUB9Wwzs40GGdfC%2FWBoCSaNL22k9mYuN0iDriWPCX%2Bopyioye%2FlEYJ1hReA4QKYdrNz%2B1WB%2BAvvtWPhzlZ1xKwFzipgMz31LtvaBQb3d9qlWJbzBVcgzZ%2FKMbyqt5UQHwf8x%2BDVS4GXo5wby2DLGqLEGNYAB4KivEviOkV1L0QKJAWFViHuWJoUFT%2Fge%2BKpaY4VlJ385FX8DofPJDn2W4ioHFxX7fkWYgryafyrGORgTY6de7tIe0QQmja%2FHqDNmo8xmbEJGPMIYHBxYBn5seTkNuFRZ7Fk07c7xkVu5qw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240814T054422Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZDZTBZOBO4W7PBUC%2F20240814%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=fb71a6a536d2da14190d296518d142fbf57c000c3c6481112a94981a50004492');

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().playVideo();
    }
  };

  const handleNext = () => {
    if (inputUrl) {
      setUrl(inputUrl);
      setInputUrl('');
    }
  };

  return (
    <div className="App">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"  
        height="500px" 
      />
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter video URL (e.g., S3 link)"
          style={{ padding: '10px', width: '60%', fontSize: '16px' }}
        />
        <button
          onClick={handleNext}
          style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
      <button onClick={handlePlay} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Play Video
      </button>
    </div>
  );
}

export default Room;
