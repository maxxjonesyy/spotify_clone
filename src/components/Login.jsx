import React from "react";

function Login({ AUTH_URL }) {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-10 bg-spotifyGrey'>
      <img src='./spotify-icon.svg' alt='spotify logo' className='w-[150px]' />

      <div className='text-center'>
        <h1 className='text-white font-bold text-3xl'>Spotify Clone</h1>
      </div>

      <div className='flex flex-col gap-5'>
        <button
          onClick={() => (window.location = AUTH_URL)}
          className='h-[40px] w-[250px] text-white font-semibold bg-spotifyGreen rounded-full'
        >
          Login to Spotify
        </button>

        <button className=' h-[40px] w-[250px] text-white font-semibold bg-spotifyGreen rounded-full'>
          <a href='https://www.spotify.com/au/signup' target='_blank'>
            Sign Up
          </a>
        </button>
      </div>
    </div>
  );
}

export default Login;
