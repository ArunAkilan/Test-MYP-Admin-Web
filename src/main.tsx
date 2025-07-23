import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_ST_OAUTH_DEMO_CLIENT_ID}>
            <BrowserRouter basename="/admin">
              <App />
            </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
   </StrictMode>
)
