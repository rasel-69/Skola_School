import React from 'react';

const Students = () => {

    const handleSubmit=async (e)=>{
        //const student={studentName,studentEmail,studentDOB,studentFatherName,studentMotherName,studentPresentAddress,studentPermanentAddress,lastSchoolName}
    }

    return (
        <div className='flex mt-20 justify-center items-center'>
            <div className="card w-full bg-base-100 shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-orange-400 my-4">Admission</h2>
                    <form className='text-orange-600' onSubmit={handleSubmit}  >

                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    type="text"
                                    placeholder="Enter  Student Full name : Karim Khan "
                                    className="input input-bordered w-full max-w-xs"
                                    value={studentName}
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    type="email"
                                    placeholder="Enter a Email for student"
                                    value={studentEmail}
                                    className="input input-bordered w-full max-w-xs"

                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Date of Birth"
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={studentDOB}
                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    value={className}
                                >
                                    <option value="7:00 AM - 8:00 AM">Select Class Time</option>
                                    <option value="8:00 AM - 9:00 AM">1</option>
                                    <option value="9:00 AM - 10:00 AM">2</option>
                                    <option value="10:00 AM - 11:00 AM">3</option>
                                    <option value="10:40 PM - 10:54 PM">4</option>
                                    <option value="12:00 PM - 1:00 PM">5</option>
                                    <option value="1:00 PM - 2:00 PM">6</option>
                                    <option value="2:00 PM - 3:00 PM">7</option>
                                    <option value="3:00 PM - 4:00 PM">8</option>
                                    <option value="4:00 PM - 5:00 PM">9</option>
                                    <option value="5:00 PM - 6:00 PM">10</option>

                                </select>
                            </label>

                        </div>




                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Father's Name"
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={studentFatherName}
                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Mother's Name "
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={studentMotherName}
                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Present Address "
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={studentPresentAddress}
                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Permanent Address "
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={studentPermanentAddress}
                                    required
                                />
                            </label>
                        </div>

                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Father's Occupation"
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={fatherOccupation}
                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Mother's Occupation "
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={motherOccupation}
                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Last School Name "
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={lastSchoolName}
                                    required
                                />
                            </label>

                            <label className="form-control w-full max-w-xs pb-2">
                                <input
                                    placeholder="Enter Permanent Address "
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"

                                    required
                                />
                            </label>
                        </div>






                        <button className='btn mb-2 w-full max-w-xs text-white btn-neutral mt-4' type="submit">Assign</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Students;