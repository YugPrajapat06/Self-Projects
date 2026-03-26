import React, { useState } from 'react'
import "./landingSec2.scss"



const LandingSec2 = () => {

  const seriesArr = [
    {
      id: 1,
      title: "Ekaki",
      episode: "Season 2 • Ep 2",
      poster: "https://www.iwmbuzz.com/wp-content/uploads/2025/04/ashish-chanchlani-marks-his-web-series-debut-with-ekaki-reveals-intriguing-posters.jpg",
      videoId: "3wNk0Vih7C4"
    },
    {
      id: 2,
      title: "Raita YT mini series",
      episode: "Season 2 • Ep 4",
      poster: "https://i.ytimg.com/vi/PzpZiDStyAw/maxresdefault.jpg",
      videoId: "2_gvwcMD-Js"
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className='LandingSec2'>
      <div className='trandingText'>
        <div className='redLine'></div>
        <h2>New Releases</h2>
      </div>
      <div className="cards">
        {
          seriesArr.map((series, index) => {
            return (
              <div
                key={series.id}
                className="card"
                onMouseEnter={() => { setHoveredIndex(index) }}
                onMouseLeave={() => { setHoveredIndex(null) }}
              >
                <div className="img">
                  {
                    hoveredIndex !== index && (
                      <img src={series.poster} alt={series.title} />
                    )
                  }
                  {
                    hoveredIndex === index && (
                      <iframe
                        className='video'
                        src={`https://www.youtube.com/embed/${series.videoId}?autoplay=1&mute=0&controls=0`}
                        frameBorder="0"
                        allow="autoplay"
                      ></iframe>
                    )
                  }
                </div>
                <h3>{series.title}</h3>
                <p>{series.episode}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default LandingSec2
