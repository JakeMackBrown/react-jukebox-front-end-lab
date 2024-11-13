import { useState, useEffect } from 'react';
import { index, deleteTrack } from '../services/trackService';

const TrackList = (props) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const tracksData = await index();
        setTracks(tracksData);
      } catch (error) {
        console.error('Error loading tracks:', error);
      }
    };
    loadTracks();
  }, []);

  const handleDeleteTrack = async (trackId) => {
    try {
      await deleteTrack(trackId);
      const updatedTracks = tracks.filter(track => track._id !== trackId);
      setTracks(updatedTracks);
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  return (
    <div>
      <h1>Tracks</h1>
      <ul>
        {tracks.map(track => (
          <li key={track._id}>
            {track.title} by {track.artist}
            <button onClick={() => props.onEditTrack(track)}>Edit</button>
            <button onClick={() => handleDeleteTrack(track._id)}>Delete</button>
            <button onClick={() => props.onPlayTrack(track)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;