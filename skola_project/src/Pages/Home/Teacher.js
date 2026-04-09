import React from 'react';
import teacher1 from '../../assets/teacher1.jpg'



const Teacher = () => {






    return (
        <div className='my-28'>
          <h1 className='text-4xl font-semibold my-16 pl-9'>Our Experts Instructors</h1>
            <div className='grid grid-cols-1   gap-5 lg:grid-cols-3 pl-16 '>
            
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src={teacher1}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                             src={teacher1}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                             src={teacher1}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Teacher;