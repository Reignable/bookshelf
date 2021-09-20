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

const App = () => {
  const [openDialog, setOpenDialog] = useState(DIALOG.none)

  const closeDialog = () => setOpenDialog(DIALOG.none)

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
      </Dialog>
      <Dialog
        aria-label="Register Form"
        isOpen={openDialog === DIALOG.register}
        onDismiss={closeDialog}
      >
        <button onClick={closeDialog}>Close</button>
        <h2>Register</h2>
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
