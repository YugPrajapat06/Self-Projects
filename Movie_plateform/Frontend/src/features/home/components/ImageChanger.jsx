import React, { useEffect, useState } from 'react'
import LandingVd from "../../../assets/videos/Landing_DS.mp4"
import "./imagechanger.scss"

const ImageChanger = () => {

    return (
        <main className='ImageChanger'>
            <div className='videoLayer'>
                <video src={LandingVd} autoPlay muted loop playsInline onContextMenu={(e) => e.preventDefault()}></video>
            </div>

            <div className="leftSideCard">
                <div className='details'>
                    <button className='button primaryBg'>PREMIERE</button>
                    <h1>DEMON<br /><span className='primary'>SLAYER</span></h1>
                    <p>Experience the pulse-pounding thrill of the year's most anticipated action masterpiece. Stream in Ultra HD 4K exclusively on Movies Hub.</p>
                    <div className="btns">
                        <button className=' btn2 priBtn primaryBg'>Get Started</button>
                        <button className=' btn2  secText'>Watch Trailer</button>
                    </div>
                </div>
            </div>

            {/* <div className="dashboard">
                <div className="coverImages">
                    <img src={movies[counter].banner} alt="" />
                </div>
                <div className="details">
                    <h1>{movies[counter].name}</h1>
                    <p>{movies[counter].description}</p>
                    <p><span>Production: </span>{movies[counter].production}</p>
                    <p><span>Release Data : </span>{movies[counter].releaseDate}</p>
                    <p><span>Rating : </span>Rating</p>

                    <button className='button'>Watch Movie</button>
                </div>
            </div> */}
        </main>
    )
}

export default ImageChanger
