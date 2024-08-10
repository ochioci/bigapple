import {useState} from "react";

export function LoginContent({LoginHook, LoginState, StateHook, AuthState, AuthHook}) {
    // console.log(AuthHook)
    const [reqState, reqHook] = useState("waiting")
    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        gridTemplateColumns: "1fr"
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
                    console.log("success!")
                    StateHook("home")
                } else {
                    console.log("failure")
                    reqHook("waiting")
                }
            }
        };
        reqHook("sending")

        req.open("POST", "/login", true);
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
                } else {
                    console.log("failure")
                    reqHook("waiting")
                }
            }
        };
        req.open("POST", "/logout", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send()


    }

    if (LoginState === "Log out") {
        return <div>
            <button onClick={logout}>Log out</button>
        </div>
    }
    else if (reqState === "done") {
        return <div>
            Successfully Logged In
            <button onClick={reset}>Go to homepage</button>
        </div>
    }
    else if (reqState === "sending") {
        return <div>
            Waiting
        </div>
    }
    else{
        return <div  onSubmit={formSubmit} style={style}>
            <div>Login</div>
            <form action="/login" method="POST">
                <label>Email</label>
                <input type={"text"}/>
                <label>Password</label>
                <input type={"text"}/>
                <button type="submit">Send</button>
            </form>
        </div>
    }

}