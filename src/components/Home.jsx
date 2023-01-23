import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Playlists from "./Playlists";
import Artists from "./Artists";
import Played from "./Played";
import Search from "./Search";

function Home({ user, setUser, token }) {
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState(false);
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
      "https://api.spotify.com/v1/me/player/recently-played?limit=10",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRecentlyPlayed(
      data.items.map((item) => {
        return {
          image: item.track.album.images[1].url,
          songName: item.track.name,
          artistName: item.track.artists[0].name,
          externalUrl: item.track.external_urls.spotify,
          rating: item.track.explicit,
        };
      })
    );
  }

  async function getTopArtists() {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=8&offset=0",
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

  function renderDashboard() {
    getUserPlaylists();
    getTopArtists();
    getRecentlyPlayed();
  }

  useEffect(() => {
    setLoading(true);
    renderDashboard();

    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className='flex flex-col justify-between h-screen sm:flex-row'>
      <div className='bg-black sm:w-[300px]'>
        <Navbar
          user={user}
          setUser={setUser}
          setActiveNav={setActiveNav}
          setLoading={setLoading}
        />
      </div>

      <div className='flex-1 overflow-auto p-10 text-white bg-gradient-to-t from-spotifyGrey to-spotifyBlack'>
        {activeNav === false ? (
          <>
            <h2 className='text-3xl font-bold'>
              {currentTime < 12 ? "Good Morning" : "Good Afternoon"}
            </h2>
            <Playlists userPlaylists={userPlaylists} loading={loading} />
            <Artists topArtists={topArtists} loading={loading} />
            <Played recentlyPlayed={recentlyPlayed} loading={loading} />
          </>
        ) : (
          <Search token={token} loading={loading} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}

export default Home;
