import {useState} from "react";

export function LoginContent({StateHook}) {
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
                let message = JSON.parse(req.response).message
                if (message === "success") {
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

    if (reqState == "done") {
        return <div>
            Successfully Logged In
            <button onClick={reset}>Go to homepage</button>
        </div>
    }
    else if (reqState == "sending") {
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