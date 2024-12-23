import React, { useState } from 'react';
import Lottie from 'lottie-react';
import registerAnimation from '../assets/lottie/register.json';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoLogoGoogle } from "react-icons/io";
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2'

const Register = () => {

    const { createNewUser, setUser, signInWithGoogle, updateMyProfile } = useAuth();
    // const location = useLocation();

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ name, photo, email, password });

        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        // const password = "Passw1";
        const isValid = regex.test(password);
        // console.log(isValid); // true if valid, false otherwise

        if (!isValid) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
            // toast.error('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.', {
            //     position: "top-right",
            //     autoClose: 2000
            // })

            Swal.fire({
                // position: "top-end",
                icon: "error",
                title: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long',
                showConfirmButton: false,
                timer: 3000
            });

            return;
        }

        setError('');

        createNewUser(email, password)
            .then(result => {
                setUser(result.user);
                // console.log(result.user);
                // updateMyProfile({ displayName: name, photoURL: photo });
                // navigate('/');

                const newUser  = result.user;

                Swal.fire({
                    title: "Congratulations!",
                    text: "You have successfully registered!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateMyProfile({ displayName: name, photoURL: photo })
                            // navigate('/');
                            .then(() => {
                                setUser({ ...newUser, displayName: name, photoURL: photo });
                                navigate('/');
                            })
                            .catch(err => {
                                console.log(err.message);
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
                })
            })
            .catch(err => {
                setError(err.message);

                Swal.fire({
                    // position: "top-end",
                    icon: "error",
                    title: error,
                    showConfirmButton: false,
                    timer: 3000
                });
            })
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <Lottie className='w-[50%] mx-auto' animationData={registerAnimation}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ml-20">
                        {/* <h1 className="text-5xl font-bold ml-16">Login now!</h1> */}
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <div className='my-2'>
                                <h1>Already have an account? <NavLink to={'/login'} className='text-primary link link-hover'>Login</NavLink></h1>
                            </div>

                            {/* Google Login */}
                            <div className="text-center">
                                {/* <button onClick={signInWithGoogle} className="btn btn-primary btn-outline rounded-full"> */}
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
                                                        // navigate(location?.state ? location.state : "/");
                                                        navigate('/');
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
                                    className="btn btn-primary btn-outline rounded-full"
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

export default Register;