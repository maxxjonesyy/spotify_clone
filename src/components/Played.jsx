import React from "react";
import Loading from "./Loading";

function Played({ loading, recentlyPlayed }) {
  return (
    <div className='pt-10'>
      <h2 className='text-3xl font-bold'>Recently Played</h2>
      <div className='flex flex-col gap-5 pt-10'>
        {loading ? (
          <Loading />
        ) : (
          recentlyPlayed.map((song, index) => (
            <div
              key={index}
              className='flex justify-between items-center bg-white/5 rounded shadow-sm'
            >
              <div className='flex items-center w-full'>
                <img
                  src={song.image}
                  alt='song artwork'
                  className='w-[80px] rounded-l'
                />
                <div className='pl-3 w-full'>
                  <p className='pb-1 text-sm font-bold w-[100%]'>
                    {song.songName}
                  </p>
                  {song.rating === false ? (
                    <p className='text-xs inline-block pl'>{song.artistName}</p>
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
          ))
        )}
      </div>
    </div>
  );
}

export default Played;
