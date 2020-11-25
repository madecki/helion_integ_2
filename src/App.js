import { useState } from 'react';
import { songsList as sl } from './songs';
import './App.css';

function App({songsList = sl}) {
  const [ displayedSongsList, updateSongsList ] = useState(songsList)

  const toggleSongFavStatus = clickedIndex => {
    const editedDisplayedSongsList = [...displayedSongsList];
    editedDisplayedSongsList[clickedIndex].isFav = !editedDisplayedSongsList[clickedIndex].isFav;
    updateSongsList(editedDisplayedSongsList)
  }

  return (
    <section className="songs-list">
      <div className="container">
        <h1>Songs list</h1>

        <div className="songs-wrapper">
          {displayedSongsList.map((song, index) => {
            return (
              <div
                key={`${song.title}-${index}`}
                data-testid={`song-container-${song.title}-${index}`}
                className="card"
              >
                <h2 data-testid={`song-title-${song.title}`}>{song.title}</h2>
                <p data-testid={`song-author-${song.author}`}>{song.author}</p>

                <button
                  className={song.isFav ? 'btn btn-fav' : 'btn btn-secondary'}
                  data-testid={`song-btn-${song.title}`}
                  onClick={() => {toggleSongFavStatus(index)}}
                >
                  {song.isFav ? 'un-fav' : 'make fav'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default App;
