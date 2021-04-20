import { React, useState, useContext, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/auth"
import { ReactComponent as ArrowDown } from "../assets/icons/arrowDown.svg"
import { TriangleBoxUser } from "./TriangleBoxUser"

export const UserHeader = () => {
  let location = useLocation()
  const { user, logout } = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const logedUser = useRef(null)
  const wrapper = useRef(null)

  function handleShowOutside() {
    console.log("pe")
    show ? setShow(false) : setShow(true)
  }

  function handleShow(e) {
    show ? setShow(false) : setShow(true)
    document.addEventListener("click", handleShowOutside)
  }

  const menuBar = user ? (
    <div
      style={{
        width: "1em !important",
        minWidth: "1em !important",
      }}
      className="nav-wrapper user-loged">
      <div
        style={{
          width: "1em !important",
          minWidth: "1em !important",
        }}
        className="navMore"
        ref={logedUser}
        onClick={handleShow}>
        <div style={{ width: "8em" }} className="secondaryButton profile">
          <p>{user.username}</p> &nbsp; <ArrowDown className="arrowDown" />
        </div>

        <TriangleBoxUser referent={wrapper} show={show} logout={logout} />
      </div>
    </div>
  ) : (
    <div className="user">
      <Link
        to={{
          pathname: `/login`,
          state: { background: location },
        }}
        className="secondaryButton">
        <p>Sign in</p>
      </Link>
      <Link
        to={{
          pathname: `/register`,
          state: { background: location },
        }}
        className="primaryButton">
        <p>Sign up</p>
      </Link>
    </div>
  )
  return menuBar
}
