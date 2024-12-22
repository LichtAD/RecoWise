import React, { useEffect, useState } from 'react';

const Navbar = () => {

    // ! theme function
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);


    const links = <>
        <li><a>Item 1</a></li>
        <li>
            <details>
                <summary>Parent</summary>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
            </details>
        </li>
        <li><a>Item 3</a></li>
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                        <img src="/images/logo.jpeg" className='w-14' alt="" />
                        <a className="btn btn-ghost text-xl">RecoWise</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
                <div>
                    {/* ⁡⁢⁣⁢customize start⁡ */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className={`btn m-1 ${theme === 'dark' ? 'bg-[#2A323C]' : 'bg-base-200'} border-none flex justify-center items-center w-24`}>
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
                    {/* customize end */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;