import { useState, useEffect } from 'react';
import axios from 'axios';

const TrackForm = ({ currentTrack, onSave, onCancel }) => {
  const [track, setTrack] = useState({
    title: '',
    artist: '',
    coverArtUrl: '',
    soundClipUrl: ''
  });

  useEffect(() => {
    if (currentTrack) {
      setTrack(currentTrack);
    }
  }, [currentTrack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrack({ ...track, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTrack) {
        await axios.put(`http://localhost:3000/tracks/${currentTrack._id}`, track);
      } else {
        await axios.post('http://localhost:3000/tracks', track);
      }
      onSave();
    } catch (error) {
      console.error('Error saving track:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title: <input type="text" name="title" value={track.title} onChange={handleChange} required /></label>
      <label>Artist: <input type="text" name="artist" value={track.artist} onChange={handleChange} required /></label>
      <label>Cover Art URL: <input type="text" name="coverArtUrl" value={track.coverArtUrl} onChange={handleChange} /></label>
      <label>Sound Clip URL: <input type="text" name="soundClipUrl" value={track.soundClipUrl} onChange={handleChange} /></label>
      <button type="submit">Save Track</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default TrackForm;