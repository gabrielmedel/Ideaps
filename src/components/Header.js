import { React, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { ReactComponent as ArrowDown } from "../assets/icons/arrowDown.svg"
import { TriangleBox } from "../components/TriangleBox"

import { UserHeader } from "./UserHeader"

export const Header = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="logo">
          <Link to="/">
            <p>IDEAPS</p>
          </Link>
        </div>
        <div className="nav">
          <div className="nav-wrapper">
            <div className="Explore">
              <NavLink to="/explore" activeClassName="activeNav">
                <p>Explore</p>
              </NavLink>
            </div>
            <div className="Share">
              <NavLink to="/share" activeClassName="activeNav">
                <p>Share</p>
              </NavLink>
            </div>
            <div
              className="navMore"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}>
              <p>More</p>
              &nbsp;
              <ArrowDown className="arrowDown" />
              <TriangleBox show={show} />
            </div>
          </div>
          <div className="miniLine"></div>
          <UserHeader />
        </div>
      </div>
    </div>
  )
}
