
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import  auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useForm } from "react-hook-form"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import useToken from '../../hooks/useToken';


const Login = () => {
    const [signInWithGoogle, gLoading, gUser, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm() // hook form 

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token]=useToken(user|| gUser)
    // displaying SingIn Error in Form using variable
    let SignInerror;

    
    // for protecting routing
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
  //  console.log(from)

   if (gUser || user) {
        // console.log(gUser || user);
         // if we found user in Login then redirect to appointment 
         navigate(from, { replace: true });
     }  
     if(gUser){
        navigate('/')
     }

     useEffect(() => {
        // Check for user existence after the component has mounted
        if (token) {
          navigate(from, { replace: true });
        }
      }, [token, from,navigate]); 



      if(user || gUser){
        navigate("/")
      }

    if(user || gUser){
        console.log(user || gUser)
    }
    

    if (gLoading || loading) {
        return <Loading />;
    }

    if (gError || error) {
        SignInerror = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>;
    }

    
  
   


    const onSubmit = (data) => {
        console.log(data)
        console.log("Loged in")
        signInWithEmailAndPassword(data.email, data.password);
    }

    const handleSignInWithGoogle = async () => {
        await signInWithGoogle();
        // No need to navigate here; it will be handled by the useEffect when the user state changes.
    }



/**Now write code that teacher can't give attendece before their respective time in that date  */

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100  shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-orange-400">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* THis for email INput field*/}
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
                                        message: 'Provide a Valid email'
                                    }
                                })}
                            />

                            <div className="label">
                                {errors.email?.type === "required" && <span className="label-text text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === "pattern" && <span className="label-text text-red-500">{errors.email.message}</span>}

                            </div>
                        </label>

                        {/*This is for Password input field */}

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
                                        message: 'Enter more than 6 charecters'
                                    }
                                })}
                            />

                            <div className="label">
                                {errors.password?.type === "required" && <span className="label-text text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === "minLength" && <span className="label-text text-red-500">{errors.password.message}</span>}
                                <small><Link className='text-orange-400' to="/forgotpassword">Forgot Password ?</Link></small>
                            </div>

                        </label>



                        {SignInerror}
                        <input className="btn mb-2 w-full max-w-xs text-white   btn-neutral" type="submit" value="Login" />
                        <p><small>New to ecommerce? <Link className='text-orange-400' to="/signup">Create an account</Link></small></p>
                    </form>



                    <div className="divider">OR</div>
                    <button
                         onClick={handleSignInWithGoogle}
                        className="btn btn-outline">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;