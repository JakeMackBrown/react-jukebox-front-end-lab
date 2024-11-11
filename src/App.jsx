import { useState } from 'react';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import NowPlaying from './components/NowPlaying';
import './App.css';

const App = () => {
  const [view, setView] = useState('list'); // default view is the list of tracks
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleAddTrack = () => {
    setCurrentTrack(null);
    setView('form');
  };

  const handleEditTrack = (track) => {
    setCurrentTrack(track);
    setView('form');
  };

  const handleDeleteTrack = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tracks/${id}`);
      setView('list');
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  const handleSaveTrack = () => {
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="App">
      <header>
        <h1>Reactville Jukebox</h1>
        <nav>
          <button onClick={() => setView('list')}>Home</button>
          <button onClick={handleAddTrack}>Add Track</button>
        </nav>
      </header>
      {view === 'list' && (
        <TrackList
          onEditTrack={handleEditTrack}
          onDeleteTrack={handleDeleteTrack}
          onPlayTrack={handlePlayTrack}
        />
      )}
      {view === 'form' && (
        <TrackForm
          currentTrack={currentTrack}
          onSave={handleSaveTrack}
          onCancel={handleCancel}
        />
      )}
      <NowPlaying track={currentTrack} />
    </div>
  );
};

export default App;