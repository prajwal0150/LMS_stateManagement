// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './State/Store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId="113390888848-12t5r2e16n3h39fs2llthrs6ickdsnq9.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </Provider>
    
  // </StrictMode>
)
