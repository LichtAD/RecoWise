import React, { useState } from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/lottie/Login.json';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoLogoGoogle } from "react-icons/io";
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2'

const Login = () => {

    const { logInUser, setUser, signInWithGoogle } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const [error, setError] = useState('');
    // console.log(error);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });

        logInUser(email, password)
            .then(result => {
                setUser(result.user);
                // console.log(result.user);
                // navigate(location?.state ? location.state : "/");

                Swal.fire({
                    title: "Congratulations!",
                    text: "You have successfully registered!",
                    icon: "success",
                    confirmButtonText: "OK"
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            navigate(location?.state ? location.state : "/");
                        }
                    })
            })
            .catch(err => {
                setError(err.message);

                Swal.fire({
                    // position: "top-end",
                    icon: "error",
                    title: err.message,
                    showConfirmButton: false,
                    timer: 3000
                });
            })
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold ml-16">Login now!</h1>
                        <Lottie className='w-[100%] mx-auto' animationData={loginAnimation}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        {/* <h1 className="text-5xl font-bold ml-16">Login now!</h1> */}
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="text-black input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="text-black input input-bordered" required />
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-custom-gradient-2 text-white border-none">Login</button>
                            </div>
                            <div className='my-2'>
                                <h1 className='text-white'>Don't have an account? <NavLink to={'/register'} className='text-white link link-hover'>Register</NavLink></h1>
                            </div>

                            {/* Google Login */}
                            <div className="text-center text-white">
                                <button
                                    onClick={async () => {
                                        try {
                                            const result = await signInWithGoogle(); // Wait for the login to complete
                                            if (result) {
                                                // Show success alert only after successful login
                                                Swal.fire({
                                                    title: "Congratulations!",
                                                    text: "You have successfully logged in!",
                                                    icon: "success",
                                                    confirmButtonText: "OK",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        navigate(location?.state ? location.state : "/");
                                                        // navigate('/');
                                                    }
                                                });
                                            }
                                        } catch (error) {
                                            // Handle login failure if necessary
                                            Swal.fire({
                                                title: "Login Failed",
                                                text: error.message || "An error occurred during login.",
                                                icon: "error",
                                                confirmButtonText: "Try Again",
                                            });
                                        }
                                    }}
                                    className="btn text-white btn-outline rounded-full"
                                >
                                    <IoLogoGoogle size={20} /> Login with Google
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;