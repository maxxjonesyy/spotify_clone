import axios from "axios";
import React, { useState } from "react";
import Loading from "./Loading";

function Search({ token, loading }) {
  const [searchedSong, setSearchedSong] = useState();
  const [searchedArtist, setSearchedArtist] = useState();

  async function getSearchedSong() {
    const input = document.getElementById("search");
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${input.value}&type=track&limit=10&offset=0`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSearchedSong(
      data.tracks.items.map((song) => {
        return {
          name: song.name,
          artistName: song.artists[0].name,
          externalUrl: song.external_urls.spotify,
          image: song.album.images[1].url,
        };
      })
    );
  }

  async function getSearchedArtist() {
    const input = document.getElementById("search");
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${input.value}&type=artist&limit=5&offset=0`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSearchedArtist(
      data.artists.items.map((artist) => {
        return {
          name: artist.name,
          externalUrl: artist.external_urls.spotify,
          type: artist.type,
          image: artist.images,
        };
      })
    );
  }

  function handleSearch(e) {
    e.preventDefault();
    getSearchedSong();
    getSearchedArtist();
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          id="search"
          className="w-[290px] p-2.5 rounded-full text-black outline-none text-sm "
        />
      </form>

      {searchedSong === undefined || searchedArtist === undefined ? (
        <></>
      ) : (
        <div className="flex gap-10 pt-10 h-[300px]">
          <div className="w-1/3">
            <h2>Top result</h2>
            <div className="flex flex-col items-start gap-5 p-5 bg-white/5 rounded mt-5 h-full">
              <img
                src={searchedArtist[0].image[0].url}
                alt="artist"
                className="w-[100px] rounded-full shadow-md"
              />
              <h2>{searchedArtist[0].name}</h2>
              <p className="text-sm p-1.5 uppercase rounded-full bg-white/5">
                {searchedArtist[0].type}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h2>Songs</h2>
            <div className="flex flex-col gap-5 h-full mt-5 overflow-scroll">
              {searchedSong.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between hover:bg-white/5"
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={song.image}
                      alt="song artwork"
                      className="w-[50px]"
                    />
                    <div className="pl-3">
                      <p className="pb-1 max-w-[90%] font-bold text-sm">
                        {song.name}
                      </p>
                      <p className="text-xs">{song.artistName}</p>
                    </div>
                  </div>
                  <a
                    href={song.externalUrl}
                    target="_blank"
                    className="w-[40px] mr-5 transition-all opacity-20 hover:opacity-100"
                  >
                    <img src="./src/assets/playButton-icon.svg" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
