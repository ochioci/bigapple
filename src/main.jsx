import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Main} from './assets/app.jsx'
import {AboutUsContent} from './assets/aboutus.jsx'
import {HomepageContent} from './assets/homepage.jsx'
import {GetInvolvedContent} from "./assets/getinvolved.jsx";
import {ContactContent} from "./assets/contact.jsx"
import {RegisterContent} from "./assets/register.jsx";
import {LoginContent} from "./assets/login.jsx";
//
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <App></App>
  </StrictMode>,
)

function App() {
    const [State, StateHook] = useState("home")
    // console.log(StateHook)
    if (State == "aboutus") {
        return <Main StateHook ={StateHook} Content={AboutUsContent}></Main>
    } else if (State=="getinvolved") {
        return <Main StateHook ={StateHook} Content={GetInvolvedContent}></Main>
    } else if (State=="contact") {
        return <Main StateHook ={StateHook} Content={ContactContent}></Main>
    } else if (State=="register") {
        return <Main StateHook ={StateHook} Content={RegisterContent}></Main>
    } else if (State=="login") {
        return <Main StateHook ={StateHook} Content={LoginContent}></Main>
    }else {
        return <Main StateHook ={StateHook} Content={HomepageContent}></Main>
    }
}




