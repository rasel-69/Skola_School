import React from 'react';
import kids from '../../assets/1870.jpg'
import kids2 from '../../assets/14230944_5437683 (1).jpg'
import teaching from '../../assets/teaching.png'



const Banner2 = () => {
    return (
        <div className="hero  min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="carousel carousel-vertical rounded-box h-96">
                    <div className="carousel-item h-full">
                        <img src={kids} alt='' />
                    </div>
                    <div className="carousel-item h-full">
                        <img src={kids2} alt='' />
                    </div>
                    <div className="carousel-item h-full">
                        <img src={teaching} alt='' />
                    </div>
                    <div className="carousel-item h-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt='' />
                    </div>
                    <div className="carousel-item h-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt='' />
                    </div>
                    <div className="carousel-item h-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt='' />
                    </div>
                    <div className="carousel-item h-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt='' />
                    </div>
                </div>


                <div className='pl-16'>
                    <h1 className="text-5xl font-bold text-slate-700 font-mono">Top Choice For Children</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>

                    <div className='grid lg:grid-cols-2 gap-4'>
                        <p className=' h-10 w-60 pl-12 font-bold font-mono flex items-center rounded-2xl  shadow-md'>Sports Training</p>
                        <p className=' h-10  w-60  pl-12 font-bold font-mono rounded-2xl flex items-center   shadow-md'>Experts Teacher</p>
                        <p className=' h-10 w-60 pl-12 font-bold font-mono  rounded-2xl flex items-center   shadow-md'>Easy to Learn</p>
                        <p className=' h-10 w-60 pl-12 font-bold font-mono  rounded-2xl flex items-center   shadow-md'>Clear & Cleaning</p>
                    </div>

                    <div className='flex flex-row'>
                        <button className="btn bg-amber-500 h-3 w-40 rounded-3xl text-white mt-10 hover:bg-sky-700">Get Started</button>

                    

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner2;