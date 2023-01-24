import React from "react";
import Loading from "./Loading";

function Artists({ loading, topArtists }) {
  return (
    <div className='pt-10'>
      <h2 className='text-3xl font-bold'>Your Top Artists</h2>
      <div className='flex flex-wrap justify-center md:justify-start gap-8 pt-10'>
        {loading ? (
          <Loading />
        ) : (
          topArtists.map((artist, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-center w-[175px] bg-white/5 rounded p-3 shadow-md transition hover:bg-white/10 hover:scale-[1.04]'
            >
              <a href={artist.externalUrl} target='_blank'>
                <div className='h-[175px]'>
                  <img
                    src={artist.image}
                    alt='artist'
                    className='w-full h-full object-cover rounded'
                  />
                </div>

                <p className='text-lg pt-3'>{artist.name}</p>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Artists;
