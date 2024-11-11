const NowPlaying = ({ track }) => {
  return (
    track ? (
      <div className="now-playing">
        <h2>Now Playing: {track.title} by {track.artist}</h2>
        {track.coverArtUrl && <img src={track.coverArtUrl} alt={`${track.title} cover art`} />}
        {track.soundClipUrl && <audio controls src={track.soundClipUrl}></audio>}
      </div>
    ) : (
      <div>Nothing is currently playing.</div>
    )
  );
};

export default NowPlaying;