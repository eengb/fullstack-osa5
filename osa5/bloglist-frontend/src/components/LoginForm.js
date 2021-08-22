import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ( { handleSubmit,username,password,usernameStates,passwordStates }) => {
  return(
    <div>
      <h2>Login..</h2>
      <form onSubmit={handleSubmit}>
        <div>
  username
          <input id="username" type = "text"  value = {username} name="username" onChange={usernameStates} />
        </div>
        <div>
  password
          <input id="password"  type = "text"  value = {password} name="password" onChange={passwordStates} />
        </div>
        <button id="loginbutton" type ="submit"> login </button>
      </form>
    </div>
  )

}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  usernameStates: PropTypes.func.isRequired,
  passwordStates: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm