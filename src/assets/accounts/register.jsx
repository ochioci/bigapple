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
        let userRole = e.target[4].value
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    reqHook("done")
                    reset()
                } else {
                    console.log("failure")
                    reqHook("failure")
                }
            }
        };
        reqHook("sending")

        req.open("POST", "/register", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"firstname": firstname, "lastname": lastname, "email": email, "password": password, "userRole": userRole}))

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
    } else if (reqState=="failure") {
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
                <label>Role</label>
                <select>
                    <option value={"Picker"}></option>
                    <option value={"Shelter"}></option>
                    <option value={"Estate"}></option>
                    <option value={"Admin"}></option>
                </select>
                <button type="submit">Send</button>
            </form>
            Email already in use.
        </div>
    }
    else {
        return <div onSubmit={formSubmit} style={style}>
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
                <label>Role</label>
                <select>
                    <option value={"Picker"}>Picker</option>
                    <option value={"Shelter"}>Shelter</option>
                    <option value={"Estate"}>Estate</option>
                    <option value={"Admin"}>Admin</option>
                </select>
                <button type="submit">Send</button>
            </form>
        </div>
    }

}