import React from 'react';
import programs1 from '../../assets/programs1.jpg'
import programs2 from '../../assets/programs2.jpg'
import programs3 from '../../assets/programs3.jpg'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
const cardData = [
    {
        imgSrc:programs1,
        title: "Coding For Kids",
        description: "Children embarked on an extraordinary journey through Squircle Labs, learning essential digital skills such as online communication, digital citizenship, collaboration, and critical thinking.",
        buttonText: "Buy Now"
    },
    {
        imgSrc: programs2,
        title: "Chemistry For kids",
        description: "Atoms are tiny. Molecules are like friends holding hands. Solids stay put. Liquids move. Gases fly everywhere. Water is made of hydrogen and oxygen. Salt disappears in water. Baking is like chemistry fun. Bubbles are air.",
        buttonText: "Buy Now"
    },
    {
        imgSrc: programs3,
        title: "Drawing Class",
        description: "Drawing is a magical adventure for kids! It's a world where anything is possible. They can create fantastical creatures, colorful landscapes, or exciting stories with just a pencil and paper. Drawing helps kids express their feelings, develop imagination, and build confidence.",
        buttonText: "Buy Now"
    }
];

const Programs = () => {
    return (
        <div className='my-16 bg-slate-50 '>
            <h1 className='text-center text-orange-500 text-2xl font-bold my-16'>Our Special Programs</h1>
            <p className='text-center text-4xl font-mono text-slate-700 font-bold mb-20'>We Meet Kids At Their Level <br/>
            Regardless Of Their Age</p>
            <div className='grid grid-cols-1   gap-5 lg:grid-cols-3 pl-16 '>
                {cardData.map((card, index) => (
                    <div key={index} className="card bg-base-100  w-96 shadow-xl rounded-none">
                        <figure>
                            <img src={card.imgSrc} alt="Shoes" />
                        </figure>
                        <div className="card-body text-center">
                            <h2 className=" text-2xl font-bold text-center ">{card.title}</h2>
                            <p>{card.description}</p>
                            <div className="card-actions justify-center">
                                <button className="btn w-28 bg-orange-300 hover:bg-sky-700"><Link to='/course'><FaArrowRight className='text-2xl text-white' /> </Link>
                                </button>
                               
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Programs;
