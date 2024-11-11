import { useState, useEffect } from 'react';
import axios from 'axios';

const TrackList = ({ onEditTrack, onDeleteTrack, onPlayTrack }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tracks');
      setTracks(response.data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div>
      <h1>Tracks</h1>
      <ul>
        {tracks.map(track => (
          <li key={track._id}>
            {track.title} by {track.artist}
            <button onClick={() => onEditTrack(track)}>Edit</button>
            <button onClick={() => onDeleteTrack(track._id)}>Delete</button>
            <button onClick={() => onPlayTrack(track)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;