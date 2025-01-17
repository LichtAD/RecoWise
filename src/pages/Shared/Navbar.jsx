import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from "react-helmet";

const Navbar = () => {

    const { user, logOut, theme, setTheme } = useAuth();

    const location = useLocation();
    // console.log(location);

    
    // ! theme function
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);


    const links = (
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2 lg:text-white">
            <li>
                <NavLink className="nav_link p-2 rounded-lg" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className="nav_link p-2 rounded-lg" to="/all-queries">Queries</NavLink>
            </li>

            {user && (
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
                    <li>
                        <NavLink className="nav_link p-2 rounded-lg" to="/recommendations-for-me">Recommendations For Me</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav_link p-2 rounded-lg" to="/my-queries">My Queries</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav_link p-2 rounded-lg" to="/my-recommendations">My Recommendations</NavLink>
                    </li>
                </div>
            )}
        </div>
    );


    return (
        <div className="relative">

            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {location.pathname === '/' ? 'RecoWise' : location.pathname === '/all-queries' ? 'All Queries' : location.pathname === '/recommendations-for-me' ? 'Recommendations For Me' : location.pathname === '/my-queries' ? 'My Queries' : location.pathname === '/my-recommendations' ? 'My Recommendations' : location.pathname === '/add-queries' ? 'Add Queries' : 'RecoWise'}
                </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className="navbar md:px-6 lg:px-20 bg-custom-radial fixed top-0 left-0 right-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                        <img src="/images/logo.jpeg" className='w-14' alt="" />
                        <NavLink to="/" className="mx-4 text-xl text-[#272646] font-semibold">RecoWise</NavLink>
                        {/* {
                            user ? <p>{user.displayName}</p> : "guest"
                        } */}
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    <div>
                        {
                            user && user?.photoURL ?
                                <div className="avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                                    <div className="w-12 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                    <div>
                        {
                            user ? <button onClick={logOut} className='btn border-none bg-custom-gradient text-white'>Logout</button> : <NavLink to="/login" className="btn bg-custom-gradient text-white">Login</NavLink>
                        }
                    </div>
                </div>

                {/* theme */}
                <div>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className={`btn bg-custom-gradient text-white m-1 border-none flex justify-center items-center w-24`}>
                            <h1>Theme</h1>
                            <div>
                                <svg
                                    width="12px"
                                    height="12px"
                                    className="inline-block h-2 w-2 fill-current opacity-60"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 2048 2048">
                                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                                </svg>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content bg-base-300 w-24 rounded-box z-[1] p-2 shadow-2xl">

                            <li>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label="Light"
                                    value="light"
                                    checked={theme === 'light'}
                                    onChange={e => setTheme(e.target.value)} />
                            </li>

                            <li>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label="Dark"
                                    value="dark"
                                    checked={theme === 'dark'}
                                    onChange={e => setTheme(e.target.value)} />
                            </li>

                        </ul>
                    </div>
                    
                </div>

            </div>
        </div>
    );
};

export default Navbar;