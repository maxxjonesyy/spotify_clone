import React from "react";

function Login({ AUTH_URL }) {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-10'>
      <img src='./spotify-icon.svg' alt='spotify logo' className='w-[150px]' />
      <button
        onClick={() => (window.location = AUTH_URL)}
        className='h-[40px] w-[250px] text-white font-semibold bg-spotifyGreen rounded-full '
      >
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
