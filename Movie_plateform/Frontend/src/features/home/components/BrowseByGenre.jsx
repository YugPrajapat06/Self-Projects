import React from 'react'
import "./browseByGenre.scss"

const BrowseByGenre = () => {
  return (
    <div className='BrowseByGenre'>
      <h2>Browse By Genre</h2>
      <div className="btns">
        <button className='button'>ACTION</button>
        <button className='button'>HORROR</button>
        <button className='button'>SCIFI</button>
        <button className='button'>DRAMA</button>
      </div>
    </div>
  )
}

export default BrowseByGenre
