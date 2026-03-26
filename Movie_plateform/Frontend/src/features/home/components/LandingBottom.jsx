import { Link } from "react-router"
import "./landingBottom.scss"
import { Play } from "lucide-react"

const LandingBottom = () => {
  return (
    <div className="LandingBottom">
      <h1> <Play/> MOVIES<span> HUB</span></h1>
      <div className="links">
        <Link to={"/login"}>Help</Link>
        <Link to={"/login"}>Privacy</Link>
        <Link to={"/login"}>Terms</Link>
        <Link to={"/login"}>Cookies</Link>
      </div>
      <div className="copyrightLine">
        <p>© 2026 Movies Hub Media Group. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default LandingBottom
