import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Loading from "./Loading";

function Dashboard({ user, setUser, token }) {
  const [loading, setLoading] = useState(true);
  const [userPlaylists, setUserPlaylists] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [topArtists, setTopArtists] = useState();

  const currentTime = new Date().toTimeString().slice(0, 8);

  async function getUserPlaylists() {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUserPlaylists(
      data.items.map((item) => {
        return {
          name: item.name,
          image: item.images[0].url,
          externalUrl: item.external_urls.spotify,
        };
      })
    );
  }

  async function getRecentlyPlayed() {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=6",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setRecentlyPlayed(
      data.items.map((item) => {
        return {
          image: item.track.album.images[1].url,
          songName: item.track.name,
          artistName: item.track.artists[0].name,
          externalUrl: item.track.external_urls.spotify,
        };
      })
    );
  }

  async function getTopArtists() {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=6&offset=0",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTopArtists(
      data.items.map((item) => {
        return {
          image: item.images[1].url,
          name: item.name,
          externalUrl: item.external_urls.spotify,
        };
      })
    );
  }

  useEffect(() => {
    getUserPlaylists();
    getTopArtists();
    getRecentlyPlayed();

    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="flex flex-col justify-between sm:flex-row">
      <div className="bg-black sm:w-[300px]">
        <Navbar user={user} setUser={setUser} />
      </div>

      <div className="flex-1 p-10 text-white bg-gradient-to-t from-spotifyGrey to-spotifyBlack">
        <h2 className="text-3xl font-bold">
          {currentTime < 12 ? "Good Morning" : "Good Afternoon"}
        </h2>

        <div className="flex flex-wrap gap-8 pt-10">
          {loading ? (
            <Loading />
          ) : (
            userPlaylists.map((playlist, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-[350px] rounded shadow-sm transition-all bg-white/5 hover:bg-white/10"
              >
                <div>
                  <img
                    src={playlist.image}
                    alt="playlist"
                    className="inline-block h-[80px] rounded-l-md"
                  />
                  <p className="inline-block text-l font-semibold pl-3">
                    {playlist.name}
                  </p>
                </div>
                <a
                  href={playlist.externalUrl}
                  target="_blank"
                  className="w-[40px] mr-5 transition-all opacity-20 hover:opacity-100"
                >
                  <img src="./src/assets/playButton-icon.svg" />
                </a>
              </div>
            ))
          )}
        </div>

        <div className="pt-10">
          <h2 className="text-3xl font-bold">Your Top Artists</h2>
          <div className="flex flex-wrap gap-8 pt-10">
            {loading ? (
              <Loading />
            ) : (
              topArtists.map((artist, index) => (
                <div
                  key={index}
                  className="w-[175px] bg-white/5 rounded p-3 shadow-md transition hover:bg-white/10 hover:scale-[1.04]"
                >
                  <a href={artist.externalUrl} target="_blank">
                    <div className="h-[175px]">
                      <img
                        src={artist.image}
                        alt="artist"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <p className="text-lg pt-3">{artist.name}</p>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-10">
          <h2 className="text-3xl font-bold">Recently Played</h2>
          <div className="flex flex-col gap-5 pt-10">
            {loading ? (
              <Loading />
            ) : (
              recentlyPlayed.map((song, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white/5 rounded shadow-sm"
                >
                  <div className="flex items-center">
                    <img
                      src={song.image}
                      alt="song artwork"
                      className="w-[80px] rounded-l"
                    />
                    <div className="pl-3">
                      <p className="">{song.songName}</p>
                      <p className="">{song.artistName}</p>
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
