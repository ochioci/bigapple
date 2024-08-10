import {useState} from "react";

export function RegisterContent({StateHook}) {
    const [reqState, reqHook] = useState("waiting")
    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        gridTemplateColumns: "1fr"
    }

    function formSubmit(e) {
        e.preventDefault();
        let firstname = e.target[0].value
        let lastname = e.target[1].value
        let email = e.target[2].value
        let password = e.target[3].value
        let req = new XMLHttpRequest();
        reqHook("sending")

        req.open("POST", "/register", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"firstname": firstname, "lastname": lastname, "email": email, "password": password}))
        reqHook("done")
        return false;
    }

    function reset () {
        StateHook("login")
    }

    if (reqState == "done") {
        return <div>
            Successfully Registered
            <button onClick={reset}>Go to login</button>
        </div>
    }
    else if (reqState == "sending") {
        return <div>
            Waiting
        </div>
    }
    else{
        return <div  onSubmit={formSubmit} style={style}>
            <div>Register</div>
            <form action="/register" method="POST">
                <label>First Name</label>
                <input type={"text"}/>
                <label>Last Name</label>
                <input type={"text"}/>
                <label>Email</label>
                <input type={"text"}/>
                <label>Password</label>
                <input type={"text"}/>
                <button type="submit">Send</button>
            </form>
        </div>
    }

}