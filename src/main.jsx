import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Main} from './app.jsx'
import {AboutUsContent} from './aboutus.jsx'
import {HomepageContent} from './homepage.jsx'
import {GetInvolvedContent} from "./getinvolved.jsx";
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
    } else {
        return <Main StateHook ={StateHook} Content={HomepageContent}></Main>
    }
}




