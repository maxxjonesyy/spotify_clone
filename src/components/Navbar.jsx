import React, { useState } from "react";

function Navbar({ user, setUser, setActiveNav }) {
  const navItems = document.querySelector(".nav_items");
  const [navOpen, setNavOpen] = useState(false);

  function signOutUser() {
    setUser("");
  }

  function navRenderContent(e) {
    setActiveNav(e.target.innerHTML === "Search" ? true : false);
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
    <div className='p-5 text-white bg-black sm:flex flex-col sm:h-full sm:pt-10'>
      <div className='flex justify-between items-center sm:flex-col sm:items-start'>
        <div className='sm:flex sm:items-center'>
          <img
            onClick={signOutUser}
            src={user.image}
            className='inline-block w-[50px] rounded-full hover:cursor-pointer'
          />
          <p className='inline-block pr-3 pl-3 font-bold lg:text-xl'>
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
            className='inline-block w-[25px]'
          />
          <span
            onClick={navRenderContent}
            className='font-semibold cursor-pointer hover:text-white align-middle pl-3'
          >
            Dashboard
          </span>
        </li>
        <li className='pb-2.5 transition-all opacity-70 hover:opacity-100'>
          <img
            src='./src/assets/search-icon.svg'
            alt='search icon'
            className='inline-block w-[25px]'
          />
          <span
            onClick={navRenderContent}
            className='font-semibold cursor-pointer hover:text-white align-middle pl-3'
          >
            Search
          </span>
        </li>
      </ul>

      <button
        onClick={signOutUser}
        className='hidden w-5/6 mx-auto sm:block p-1.5 rounded-full transition-all border opacity-70 hover:opacity-100'
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
