import React from 'react';
import { useSignInWithGoogle, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const [signInWithGoogle, gUser, gError, gLoading] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [token] = useToken(user || gUser);
    const navigate = useNavigate();

    let signUpError;

    if (gLoading || loading) {
        return <Loading />;
    }

    if (gError || error) {
        signUpError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>;
    }

    if (token) {
        navigate('/about');
    }

    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        reset(); // Reset the form after successful sign-up
    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-orange-400">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Input Field */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required"
                                    }
                                })}
                            />
                            <div className="label">
                                {errors.name?.type === "required" && <span className="label-text text-red-500">{errors.name.message}</span>}
                            </div>
                        </label>

                        {/* Email Input Field */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid email'
                                    }
                                })}
                            />
                            <div className="label">
                                {errors.email?.type === "required" && <span className="label-text text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === "pattern" && <span className="label-text text-red-500">{errors.email.message}</span>}
                            </div>
                        </label>

                        {/* Password Input Field */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Enter more than 6 characters'
                                    }
                                })}
                            />
                            <div className="label">
                                {errors.password?.type === "required" && <span className="label-text text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === "minLength" && <span className="label-text text-red-500">{errors.password.message}</span>}
                            </div>
                        </label>

                        {signUpError}
                        <input className="btn mb-2 w-full max-w-xs text-white btn-neutral" type="submit" value="Sign Up" />
                        <p><small>Already have an account? <Link className='text-orange-400' to="/login">Please login</Link></small></p>
                    </form>

                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
