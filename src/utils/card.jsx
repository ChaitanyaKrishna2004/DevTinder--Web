import React from 'react'

const Card = ({ user }) => {
    const { firstName, lastName, photoUrl, gender, age, about, skills } = user;
    // data = data?.data?.[0];
    return (
        <div className="flex justify-center m-20">
            <div className="card bg-base-300 w-95 h-130 pb-3 shadow-sm">
                <figure>
                    <img className=''
                        src={photoUrl}
                        alt="Photo URL" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{firstName + " " + lastName}</h2>
                    <h3 className='my-1 font-semibold'>{age + " " + gender} </h3>
                    <h3 className='my-1 font-semibold'>{about}</h3>
                    {/* <h3>{skills}</h3> */}
                    <div className='card-actions justify-between mt-5'>
                        <button className="btn  btn-primary">Ignored</button>
                        <button className="btn btn-secondary ">Interested</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;