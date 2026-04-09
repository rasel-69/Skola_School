import React from 'react';
import bannerKids from  "../../assets/BannerKidsBGNAI.png";
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={bannerKids}
                    className="max-w-lg rounded-lg shadow-xl" 
                    alt="Kids Banner"
                />
                <div className="pr-16">
                    <h1 className="text-5xl font-bold">
                        Kids' Promising <br/>
                        <span className="text-amber-500">Tomorrow</span> Ahead
                    </h1>
                    <p className="py-6">
                        Suspendisse non blandit sapien. Nunc eleifend, enim et porta porta, 
                        eros risus tincidunt diam, vel sodales.
                    </p>
                    <button className="btn rounded-lg font-bold text-white bg-amber-500 hover:bg-sky-700">
                       <Link to='/students'>  Apply Today</Link>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
