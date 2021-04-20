import React, { useContext } from "react"
import { Route, useHistory } from "react-router-dom"
import { AuthContext } from "../context/auth"

export const AuthRoutes = ({ component: Component }, ...rest) => {
  const { user } = useContext(AuthContext)
  let history = useHistory()
  return <Route {...rest} render={props => (user ? history.goBack() : <Component {...props} />)} />
}
