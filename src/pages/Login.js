import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { ReactComponent as Cross } from "../assets/icons/cross.svg"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../components/ErrorMessage"
import { Link } from "react-router-dom"
import { gql, useMutation } from "@apollo/client"
import { AuthContext } from "../context/auth"

import { MailOutlined, LockOutlined } from "@ant-design/icons"
import { Spinner } from "../components/Spinner"

export const Login = props => {
  const context = useContext(AuthContext)

  let history = useHistory()
  let style = "disabled"
  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [serverErrors, setserverErrors] = useState({})

  const [formValues, setformValues] = useState({
    email: "",
    password: "",
  })

  function handleChange(e) {
    setformValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const onSubmit = values => {
    addUser()
  }

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData)
      history.goBack()
    },
    onError(err) {
      setserverErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: formValues,
  })

  function goToPreviousPath() {
    history.goBack()
  }

  return (
    <div className="wrapper-register-login">
      <div className="login">
        <div className="register-wrapper">
          <div className="close">
            <Cross onClick={goToPreviousPath} />
          </div>
          <h3>Hello there</h3>
          <p className="form-p">To unlock all the features of Ideaps!</p>
          <form onChange={handleChange} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="input-wrapper">
              <div className="input-container">
                <div className="input-wrapper">
                  <div className="inputGroup">
                    <MailOutlined className="iconInput" />

                    <input
                      placeholder="Write your email..."
                      className="input"
                      name="email"
                      ref={register({
                        required: "You must specify an email",
                        pattern: {
                          value: /^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  <ErrorMessage error={errors.email && errors.email.message} />
                </div>
                <div className="input-wrapper">
                  <div className="inputGroup">
                    <LockOutlined className="iconInput" />

                    <input
                      type="password"
                      placeholder="Write your password..."
                      className="input"
                      name="password"
                      ref={register({
                        required: "You must specify a password",
                      })}
                    />
                  </div>
                  <ErrorMessage error={errors.password && errors.password.message} />
                </div>

                <div className={`submit ${style}`}>
                  {!loading && <input disablded={style} type="submit" value="Sign in" />}
                  {loading && <Spinner size="small"></Spinner>}
                </div>
              </div>
            </div>
          </form>
          <br />

          {Object.keys(serverErrors).length > 0 &&
            Object.values(serverErrors).map(value => <ErrorMessage key={value} error={value} />)}

          <div className="help">
            <div className="horizontalLine"></div>
            <p>
              Forgot password? <Link to="/forgot-password"> Reset </Link>
            </p>
            <p>
              Not have an account?<Link to="/register"> Create </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`
