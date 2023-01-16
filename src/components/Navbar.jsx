import React, { useState } from "react";

function Navbar({ user, setUser }) {
  const navItems = document.querySelector(".nav_items");
  const [navOpen, setNavOpen] = useState(false);

  function signOutUser() {
    setUser("");
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 640) {
      navItems.style.display = "block";
      setNavOpen(true);
    } else {
      navItems.style.display = "none";
      setNavOpen(false);
    }
  });

  function toggleNav() {
    if (navOpen === false) {
      navItems.style.display = "block";
      setNavOpen(true);
    } else {
      navItems.style.display = "none";
      setNavOpen(false);
    }
  }

  return (
    <div className='p-5 text-white bg-black sm:flex flex-col sm:h-screen'>
      <div className='flex justify-between items-center sm:flex-col sm:items-start'>
        <div className='sm:flex sm:items-center'>
          <img
            onClick={signOutUser}
            src={user.image}
            className='inline-block w-[50px] rounded-full hover:cursor-pointer sm:w-[75px]'
          />
          <p className='inline-block pr-3 pl-3 font-bold text-lg md:text-xl'>
            {user.name}
          </p>
        </div>
        <div className='sm:hidden'>
          <img
            src='./src/assets/hamburger-icon.svg'
            alt='menu icon'
            onClick={toggleNav}
            className='cursor-pointer'
          />
        </div>
      </div>

      <ul className='nav_items float-right hidden sm:block sm:flex-1 sm:float-none sm:pt-10'>
        <li className='pb-2.5 transition-all opacity-70 hover:opacity-100'>
          <img
            src='./src/assets/home-icon.svg'
            alt='search icon'
            className='inline-block w-[30px]'
          />
          <span className='font-semibold cursor-pointer hover:text-white align-middle pl-3 sm:text-lg'>
            Home
          </span>
        </li>
        <li className='pb-2.5 transition-all opacity-70 hover:opacity-100'>
          <img
            src='./src/assets/search-icon.svg'
            alt='search icon'
            className='inline-block w-[30px]'
          />
          <span className='font-semibold cursor-pointer hover:text-white align-middle pl-3 sm:text-lg'>
            Search
          </span>
        </li>
      </ul>

      <button
        onClick={signOutUser}
        className='hidden w-full sm:block border rounded p-1.5 transition-all opacity-70 hover:opacity-100'
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
