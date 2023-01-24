import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";

function Search({ token, loading, setLoading }) {
  const [searchedSong, setSearchedSong] = useState();
  const [searchedArtist, setSearchedArtist] = useState();
  const [artistAlbums, setArtistAlbums] = useState();

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
          rating: song.explicit,
        };
      })
    );
  }

  async function getSearchedArtist() {
    const input = document.getElementById("search");
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${input.value}&type=artist&limit=6&offset=0`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSearchedArtist(
      data.artists.items.map((artist) => {
        return {
          name: artist.name,
          externalUrl: artist.external_urls.spotify,
          type: artist.type,
          image: artist.images,
          id: artist.id,
        };
      })
    );
  }

  async function getArtistsAlbums() {
    let formattedData = [];
    let formattedAlbums = [];

    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${searchedArtist[0].id}/albums?limit=10&offset=0`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    data.items.map((album) => {
      formattedData.push({
        albumName: album.name,
        image: album.images[1].url,
        externalUrl: album.external_urls.spotify,
        type: album.album_type,
      });
    });

    for (let i = 0; i < formattedData.length; i++) {
      if (formattedData[i].type === "album") {
        formattedAlbums.push(formattedData[i]);
      }
    }

    const uniqueRef = new Set();

    const uniqueAlbums = formattedAlbums.filter((element) => {
      const isDuplicate = uniqueRef.has(element.albumName);

      uniqueRef.add(element.albumName);

      if (!isDuplicate) {
        return true;
      }

      return false;
    });

    setArtistAlbums(uniqueAlbums);
  }

  function handleSearch(e) {
    setLoading(true);
    e.preventDefault();
    getSearchedSong();
    getSearchedArtist();

    setTimeout(() => {
      setLoading(false);
    }, 700);
  }

  useEffect(() => {
    if (searchedArtist !== undefined) {
      getArtistsAlbums();
    }
  }, [searchedArtist]);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='What do you want to listen to?'
          id='search'
          className='w-full sm:w-[290px] p-2.5 rounded-full text-black outline-none text-sm text-center'
        />
      </form>

      {searchedSong === undefined || searchedArtist === undefined ? (
        <></>
      ) : loading === true ? (
        <div className='pt-10'>
          <Loading />
        </div>
      ) : (
        <div>
          <div className='flex flex-col gap-10 pt-10 lg:flex-row lg:max-h-[500px]'>
            <div className='w-full lg:w-1/3'>
              <h2 className='text-3xl font-bold'>Top Result</h2>
              <div className='flex flex-col justify-center gap-5 p-5 bg-white/5 rounded mt-5 h-[76%]'>
                <a href={searchedArtist[0].externalUrl} target='_blank'>
                  <img
                    src={searchedArtist[0].image[0].url}
                    alt='artist'
                    className='w-[120px] h-[120px] rounded-full shadow-md'
                  />
                </a>
                <h2 className='text-3xl font-bold'>{searchedArtist[0].name}</h2>
                <p className='text-sm font-semibold p-1.5 uppercase rounded-full bg-white/5 w-[80px] text-center'>
                  {searchedArtist[0].type}
                </p>
              </div>
            </div>

            <div className='flex-1'>
              <h2 className='text-3xl font-bold'>Songs</h2>
              <div className='flex flex-col gap-2 h-[79.5%] mt-5 overflow-scroll'>
                {searchedSong.map((song, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between hover:bg-white/5 rounded'
                  >
                    <div className='flex items-center justify-center p-2'>
                      <img
                        src={song.image}
                        alt='song artwork'
                        className='w-[50px]'
                      />
                      <div className='pl-3 w-full'>
                        <p className='pb-1 w-[100%] font-bold text-sm'>
                          {song.name}
                        </p>
                        {song.rating === false ? (
                          <p className='text-xs inline-block pl'>
                            {song.artistName}
                          </p>
                        ) : (
                          <div>
                            <p className='inline-block w-[20px] p-1 text-xs text-center bg-white/5 rounded'>
                              E
                            </p>
                            <p className='text-xs inline-block pl-2'>
                              {song.artistName}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <a
                      href={song.externalUrl}
                      target='_blank'
                      className='w-[40px] mr-5 transition-all opacity-20 hover:opacity-100'
                    >
                      <img src='/playButton-icon.svg' />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='w-full pt-10'>
            <h2 className='text-3xl font-bold'>Artists</h2>
            <div className='flex flex-wrap justify-center md:justify-start gap-8 pt-10'>
              {searchedArtist.map((artist, index) => (
                <a href={artist.externalUrl} target='_blank'>
                  <div
                    key={index}
                    className='flex flex-col items-center justify-center w-[175px] h-full bg-white/5 rounded p-3 shadow-md transition hover:bg-white/10 hover:scale-[1.04]'
                  >
                    <div className='h-[150px] '>
                      <a href={artist.externalUrl} target='_blank'>
                        <img
                          src={
                            artist.image === undefined ||
                            artist.image.length === 0
                              ? "/default-user.svg"
                              : artist.image[0].url
                          }
                          alt='artist'
                          className='w-full h-full object-cover rounded-full'
                        />
                      </a>
                    </div>
                    <p className='text-lg pt-3'>{artist.name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className='pt-10'>
            <h2 className='text-3xl font-bold'>
              {searchedArtist[0].name} Albums
            </h2>
            <div className='flex flex-wrap gap-8 pt-10'>
              {artistAlbums.map((album, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center justify-center w-[175px] bg-white/5 rounded p-3 shadow-md transition hover:bg-white/10 hover:scale-[1.04]'
                >
                  <a href={album.externalUrl} target='_blank'>
                    <div className='h-[175px]'>
                      <img
                        src={album.image}
                        alt='artist'
                        className='w-full h-full object-cover rounded'
                      />
                    </div>
                    <p className='text-lg pt-3'>{album.albumName}</p>
                    <p></p>
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
