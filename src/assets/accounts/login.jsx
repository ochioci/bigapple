import {useState} from "react";
import {Card} from "../components/card.jsx";

export function LoginContent({LoginHook, LoginState, StateHook, AuthState, AuthHook, entries, entriesHook}) {
    // console.log(AuthHook)
    const [reqState, reqHook] = useState("waiting")
    const style = {
        gridRow: 2,
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "JustSansRegular"
    }

    function formSubmit(e) {
        e.preventDefault();
        let email = e.target[0].value
        let password = e.target[1].value
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    AuthHook(response.loginName)
                    LoginHook("Log out");
                    entriesHook([["Home", "home"],
                        ["About us", "aboutus"],
                        ["Get involved", "getinvolved"],
                        ["Contact", "contact"],
                        ["Log out", "login"],])

                    console.log("success!")
                    StateHook("home")
                } else {
                    console.log("failure")
                    reqHook("waiting")
                }
            }
        };
        reqHook("sending")

        req.open("POST", "api/login", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"email" : email, "password": password}))
        reqHook("done")
        return false;
    }

    function reset () {
        StateHook("home")
    }

    function logout () {

        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    AuthHook("---")
                    LoginHook("Log in")
                    entriesHook([["Home", "home"],
                        ["About us", "aboutus"],
                        ["Contact", "contact"],
                        ["Log in", "login"],
                        ["Register", "register"],])
                } else {
                    console.log("failure")
                    reqHook("waiting")
                }
            }
        };
        req.open("POST", "api/logout", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send()


    }

    if (LoginState === "Log out") {
        return <div style={style}>
            <Card Content={
                <div style={{fontSize: "25pt", fontFamily: "JustSansBold"}}>Log Out</div>
            } onClick={logout}>

            </Card>
        </div>
        // return <div style={style}>
        //     <button onClick={logout}>Log out</button>
        // </div>
    }
    else if (reqState === "done") {
        return <div style={style}>
            Successfully Logged In
            <button onClick={reset}>Go to homepage</button>
        </div>
    }
    else if (reqState === "sending") {
        return <div style={style}>
            Waiting
        </div>
    }
    else{
        return <div style={style}>
            <Card Content ={
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{fontSize: "30pt", fontFamily: "JustSansBold"}}>Login</div>
                    <form style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }} onSubmit={formSubmit} action="/login" method="POST">
                        <label>Email</label>
                        <input className={"loginInput"} type={"text"}/>
                        <label>Password</label>
                        <input className={"loginInput"} type={"text"}/>
                        <button type="submit">Send</button>
                    </form>
                </div>
            }>

            </Card>
        </div>




    }

}