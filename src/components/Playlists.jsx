import React from "react";
import Loading from "./Loading";

function Playlists({ loading, userPlaylists }) {
  return (
    <div className='flex flex-wrap gap-8 pt-10'>
      {loading ? (
        <Loading />
      ) : (
        userPlaylists.map((playlist, index) => (
          <div
            key={index}
            className='flex justify-between items-center w-[350px] rounded shadow-sm transition-all bg-white/5 hover:bg-white/10'
          >
            <div>
              <img
                src={playlist.image}
                alt='playlist'
                className='inline-block h-[80px] rounded-l-md'
              />
              <p className='inline-block text-l font-semibold pl-3'>
                {playlist.name}
              </p>
            </div>
            <a
              href={playlist.externalUrl}
              target='_blank'
              className='w-[40px] mr-5 transition-all opacity-20 hover:opacity-100'
            >
              <img src='/playButton-icon.svg' />
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default Playlists;
