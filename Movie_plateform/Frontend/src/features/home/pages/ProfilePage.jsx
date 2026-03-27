import React from 'react'
import "../style/profile.scss"
const ProfilePage = () => {

  const mediaArr = [
    {
      name: "Squid Games",
      cover: "https://i.pinimg.com/736x/49/f8/88/49f888da3a97afd843a4cb211fdb07b3.jpg",
      cls: "active"
    },
    {
      name: "Squid Games",
      cover: "https://i.pinimg.com/1200x/b3/bd/1d/b3bd1d2a3b727de8d9a3825d93b7be5b.jpg",
      cls: "inactive"
    },
    {
      name: "Squid Games season 2",
      cover: "https://i.pinimg.com/736x/c5/72/68/c572684812c1066d239296847ab1891c.jpg",
      cls: "inactive"
    }
  ]
  return (
    <div className="profilePage">
      <div className='profile'>
        <div className="profileDetails">
          <h1 className='greetings'>Hii <span className='userName'>User</span></h1>
          <h1>Welcome to your profile</h1>
          <p>Here you can manage your account settings, view your watchlist, and more.</p>
          <p className='signName'>Makima</p>

          <div className="logout lineup">
            <p>Are you want to Logout form your account : </p>
            <button>Logout</button>
          </div>

          <div className="addMovie lineup">
            <p>Are you want to add New movie {"(Only for Admin)"} : </p>
            <button className='button'>Add Movie</button>
          </div>
        </div>
        <div className="profilePhoto">
          <img src="https://i.pinimg.com/736x/c0/08/be/c008be1fecbeccfbf1837668c3b522f6.jpg" alt="" />
        </div>
      </div>
      <div className="mediaCase">
        <div className='achievements-section'>
          <div className="achievements">
            <h2>Active Users</h2>
            <p>100K+</p>
          </div>
          <div className="achievements">
            <h2>Video Quality</h2>
            <p>4K</p>
          </div>
          <div className="achievements">
            <h2>Followers</h2>
            <p>900K+</p>
          </div>
          <div className="achievements">
            <h2>Movies</h2>
            <p>1000+</p>
          </div>
        </div>
        <h1>POPULAR PRODUCTS</h1>
        <div className="media">
          {mediaArr.map((media) => {
            return (
              <div className="mediaCard">
                <img src={media.cover} alt="" />
                <div className={`mediaName ${media.cls}`}>
                  <p>{media.name}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default ProfilePage
