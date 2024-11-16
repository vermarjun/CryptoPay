import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Verification from './components/Verification.jsx'
import Setupwallet from './components/SetUpWallet.jsx'
import Errorpage from './components/Errorpage.jsx'
import Createwallet from './components/CreateWallet.jsx'
import Importwallet from './components/ImportWallet.jsx'
import DashBoard from './components/Dashboard/Dashboard.jsx'
import './index.css'
import Account from './components/Dashboard/Account.jsx'

export const API_URL = "/api";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Verification/>,
    errorElement:<Errorpage/>
  },
  {
    path:'/setupwallet',
    element:<Setupwallet/>,
    errorElement:<Errorpage/>
  },
  {
    path:'/createwallet',
    element:<Createwallet/>,
    errorElement:<Errorpage/>
  },
  {
    path:'/importwallet',
    element:<Importwallet/>,
    errorElement:<Errorpage/>
  },
  {
    path:'/dashboard',
    element:<DashBoard/>,
    errorElement:<Errorpage/>,
    children:[
      {
        path:'wallet/:walletId',
        element:<Account/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
