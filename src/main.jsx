import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Main} from './assets/app.jsx'
import {AboutUsContent} from './assets/info/aboutus.jsx'
import {HomepageContent} from './assets/info/homepage.jsx'
import {GetInvolvedContent} from "./assets/actions/getinvolved.jsx";
import {ContactContent} from "./assets/actions/contact.jsx"
import {RegisterContent} from "./assets/accounts/register.jsx";
import {LoginContent} from "./assets/accounts/login.jsx";
//
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <App></App>
  </StrictMode>,
)

//TODO: THINGS TO DO BEFORE PRODUCTION:
//do secure session only
//research session hijacking
//make everything secure
//lmao
//make sure email inputs are valid
//we can do client side tbh
//Implement password hashing

//TODO: Next stuff to do
//Implement distinction between admin and non-admin users, as well as types of users
//Implement portal for viewing contact messages
//Update contact messages to use accounts email instead of accounts input email

//TODO: Next feature to do:
//Implement scheduling portal



function App() {
    const [State, StateHook] = useState("home")
    const [AuthState, AuthHook] = useState("---")
    // console.log(StateHook)
    if (State == "aboutus") {
        return <Main AuthHook={AuthHook} AuthState={AuthState} StateHook ={StateHook} Content={AboutUsContent}></Main>
    } else if (State=="getinvolved") {
        return <Main AuthHook={AuthHook} AuthState={AuthState} StateHook ={StateHook} Content={GetInvolvedContent}></Main>
    } else if (State=="contact") {
        return <Main AuthHook={AuthHook} AuthState={AuthState}  StateHook ={StateHook} Content={ContactContent}></Main>
    } else if (State=="register") {
        return <Main AuthHook={AuthHook} AuthState={AuthState}  StateHook ={StateHook} Content={RegisterContent}></Main>
    } else if (State=="login") {
        return <Main AuthHook={AuthHook} AuthState={AuthState} StateHook ={StateHook} Content={LoginContent}></Main>
    }else {
        return <Main AuthHook={AuthHook} AuthState={AuthState} StateHook ={StateHook} Content={HomepageContent}></Main>
    }
}




