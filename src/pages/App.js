import "../styles/index.css"
import { Apollo } from "../ApolloProvider"
import { AuthProvider } from "../context/auth"
import { Explore } from "./Explore"
import { Switch, Route, useLocation } from "react-router-dom"
import { Header } from "../components/Header"
import { Share } from "./Share"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { Login } from "./Login"
import { Register } from "./Register"
import { Home } from "./Home"
import ScrollMemory from "react-router-scroll-memory"
import { AuthRoutes } from "../components/AuthRoutes"

function App() {
  let location = useLocation()
  let background = location.state && location.state.background

  return (
    <AuthProvider>
      <Apollo>
        <Header />

        <Switch location={background || location}>
          <Route path="/explore">
            <div>
              <ScrollMemory />
              <Explore></Explore>
            </div>
          </Route>

          <ProtectedRoute path="/share" component={Share} />

          <AuthRoutes exact path="/login" component={Login} />
          <AuthRoutes exact path="/register" component={Register} />

          <Route path="/" exact>
            <ScrollMemory />
            <Home></Home>
          </Route>
        </Switch>
        {background && <Route path="/login" children={<Login />} />}
        {background && <Route path="/register" children={<Register />} />}
      </Apollo>
    </AuthProvider>
  )
}

export default App
