import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'
import {Logo} from 'components/logo'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const DIALOG = {
  none: 'none',
  login: 'login',
  register: 'register',
}

const LoginForm = ({onSubmit, buttonText}) => {
  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = event => {
    event.preventDefault()
    const {username, password} = event.target.elements
    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

const App = () => {
  const [openDialog, setOpenDialog] = useState(DIALOG.none)

  const closeDialog = () => setOpenDialog(DIALOG.none)

  const login = formData => {
    console.log(formData)
    closeDialog()
  }

  const register = formData => {
    console.log(formData)
    closeDialog()
  }

  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenDialog(DIALOG.login)}>Login</button>
      <button onClick={() => setOpenDialog(DIALOG.register)}>Register</button>
      <Dialog
        aria-label="Login Form"
        isOpen={openDialog === DIALOG.login}
        onDismiss={closeDialog}
      >
        <button onClick={closeDialog}>Close</button>
        <h2>Login</h2>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog
        aria-label="Register Form"
        isOpen={openDialog === DIALOG.register}
        onDismiss={closeDialog}
      >
        <button onClick={closeDialog}>Close</button>
        <h2>Register</h2>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
