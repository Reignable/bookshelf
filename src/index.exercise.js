import React from 'react'
import ReactDOM from 'react-dom'

import {Logo} from 'components/logo'

const App = () => (
  <>
    <Logo width="80" height="80" />
    <h1>Bookshelf</h1>
    <button onClick={() => alert('You clicked login')}>Login</button>
    <button onClick={() => alert('You clicked register')}>Register</button>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
