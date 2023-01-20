import React from "react";
import Loading from "./Loading";

function Played({ loading, recentlyPlayed }) {
  return (
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
                  <p className="pb-1 text-sm font-bold max-w-[90%]">
                    {song.songName}
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
          ))
        )}
      </div>
    </div>
  );
}

export default Played;
