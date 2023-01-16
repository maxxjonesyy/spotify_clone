import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ClipLoader from "react-spinners/ClipLoader";

function Dashboard({ user, setUser, token }) {
  const [userPlaylists, setUserPlaylists] = useState();
  const [loading, setLoading] = useState(true);
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

    setLoading(false);
  }

  useEffect(() => {
    getUserPlaylists();
  }, []);

  return (
    <div className='h-screen w-screen flex flex-col justify-between sm:flex-row'>
      <div className='bg-black sm:w-[300px]'>
        <Navbar user={user} setUser={setUser} />
      </div>

      <div className='flex-1 p-10 text-white bg-gradient-to-t from-spotifyGrey to-spotifyBlack'>
        <h2 className='text-3xl font-bold'>
          {currentTime < 12 ? "Good morning" : "Good afternoon"}
        </h2>
        <div className='flex gap-7 flex-wrap pt-10'>
          {loading ? (
            <ClipLoader color='white' speedMultiplier='0.75' />
          ) : (
            userPlaylists.map((playlist, index) => (
              <div
                key={index}
                className='flex justify-between items-center rounded w-[400px] backdrop-blur-md transition-all bg-white/10 hover:bg-white/20'
              >
                <div className='flex items-center gap-2'>
                  <img
                    src={playlist.image}
                    alt='playlist'
                    className='h-[80px] rounded-l-md'
                  />
                  <p className='text-l font-semibold'>{playlist.name}</p>
                </div>
                <a
                  href={playlist.externalUrl}
                  target='_blank'
                  className='w-[40px] mr-5 transition-all opacity-20 hover:opacity-100'
                >
                  <img src='./src/assets/playButton-icon.svg' />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
