import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    // // ! theme function
    // const [theme, setTheme] = useState('light');

    // useEffect(() => {
    //     document.querySelector('html').setAttribute('data-theme', theme);
    // }, [theme]);


    const links = <div className='flex items-center gap-4'>
        <li><NavLink className="nav_link p-2 rounded-lg" to="/">Home</NavLink></li>
        <li><NavLink className="nav_link p-2 rounded-lg" to="/all-queries">Queries</NavLink></li>

        { 
            user ? <div className='flex items-center gap-0'>
                <li><NavLink className="nav_link p-2 rounded-lg" to="/recommendations-for-me">Recommendations For Me</NavLink></li>
                <li><NavLink className="nav_link p-2 rounded-lg" to="/my-queries">My Queries</NavLink></li>
                <li><NavLink className="nav_link p-2 rounded-lg" to="/my-recommendations">My recommendations</NavLink></li>
            </div>
            : ''
        }
    </div>

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
                            className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                        <img src="/images/logo.jpeg" className='w-14' alt="" />
                        <NavLink to="/" className="mx-4 text-xl">RecoWise</NavLink>
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
                                    <div className="w-10 rounded-full ring ring-custom-gradient ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                    <div>
                        {
                            user ? <button onClick={logOut} className='btn bg-custom-gradient text-white'>Logout</button> : <NavLink to="/login" className="btn">Login</NavLink>
                        }
                    </div>
                </div>

                {/* theme */}
                {/* <div>
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
                    
                </div> */}

            </div>
        </div>
    );
};

export default Navbar;