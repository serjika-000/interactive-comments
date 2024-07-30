import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'
import PopContext from './context/PopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PopContext>
        <App />
      </PopContext>
    </Provider>
  </React.StrictMode>,
)
