import { render, screen, fireEvent } from '@testing-library/react';
import { songsList, songsFavNotFav } from './songs';
import App from './App';

describe('Displays list of songs', () => {
  beforeEach(() => {
    render(<App songsList={songsList} />);
  })

  test('Displays songs containers', () => {
    const songContainers = screen.getAllByTestId(/song-container/);
    expect(songContainers.length).toEqual(songsList.length);
  })

  for (const song of songsList) {
    test(`displays ${song} title`, () => {
      const songH2 = screen.getByTestId(`song-title-${song.title}`).textContent;
      expect(songH2).toBe(song.title)
    })

    test(`displays ${song} author`, () => {
      const songP = screen.getByTestId(`song-author-${song.author}`).textContent;
      expect(songP).toBe(song.author)
    })
  }

  test('displays button for each song', () => {
    const buttons = screen.getAllByTestId(/song-btn/);
    expect(buttons.length).toBe(songsList.length)
  })
});

describe('Changes songs fav statuses', () => {
  beforeEach(() => {
    render(<App songsList={songsFavNotFav} />);
  })

  test('displays btn with class "btn-fav" if song is favourite', () => {
    const btn = screen.getAllByTestId(/song-btn/)[0];
    expect(btn).toHaveClass('btn-fav');
  })

  test('displays btn without class "btn-fav" if song is not favourite', () => {
    const btn = screen.getAllByTestId(/song-btn/)[1];
    expect(btn).not.toHaveClass('btn-fav');
  })

  test('changes btn class after clicking on a button of fav song', () => {
    const btn = screen.getAllByTestId(/song-btn/)[0];
    fireEvent.click(btn);
    expect(btn).not.toHaveClass('btn-fav');
  })

  test('changes btn class after clicking on a button of not fav song', () => {
    const btn = screen.getAllByTestId(/song-btn/)[1];
    fireEvent.click(btn);
    expect(btn).toHaveClass('btn-fav');
  })
});
