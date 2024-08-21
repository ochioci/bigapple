import {useState} from "react";
import {Card} from "../components/card.jsx";

export function RegisterContent({StateHook}) {
    const [reqState, reqHook] = useState("roleSelect")
    const style = {
        gridRow: 2,
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }



    if (reqState != "roleSelect") {
        const style = {
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "JustSansRegular"
        }
        return <div style={style}>
            <RegisterForm reqState={reqState} reqHook={reqHook} StateHook={StateHook}></RegisterForm>
        </div>
    } else {
        const style = {
            display: "grid",
            gridTemplateRows: "10vh auto auto auto 10vh",
            height: "100%",
            justifyItems: "center",
            alignItems: "center"
        }
        return <div style={style}>
            <div></div>
                <RoleTitle reqHook={reqHook} val={"Estate"} title={"I have fruit trees on my property"}></RoleTitle>
                <RoleTitle reqHook={reqHook} val={"Shelter"} title={"I operate a food bank"}></RoleTitle>
                <RoleTitle reqHook={reqHook} val={"Picker"} title={"Im interested in picking and delivering fruits"}></RoleTitle>
        </div>
    }


}

function RoleTitle ({reqHook, title, val}) {
    const style = {
        fontFamily: "Geometos",
        fontSize: "5vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        textAlign: "center"
    }
    return <Card onClick={() => {reqHook(val)}} Content={<div style={style}>
        <div>{title}</div>
        </div>}></Card>

}

function RegisterForm({reqState, reqHook, StateHook}) {

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
                    StateHook("login")
                } else {
                    reqHook("failure")
                    console.log("failure")
                }
            }
        };


        req.open("POST", "https://bigappleserver-a2c91f738c7f.herokuapp.com//register", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"firstname": firstname, "lastname": lastname, "email": email, "password": password, "userRole": reqState}))

        return false;
    }

    return <div style={{marginTop: "min(10vh, 3vw)", width: "min(90vh, 90vw, 90%)"}}>
        <Card Content={<div onSubmit={formSubmit} >
            <div style={{fontSize: "5vh", fontFamily: "JustSansBold"}}>Register</div>
            <form style={{fontSize: "3vh"}} action="/register" method="POST">
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
            {(reqState == "failure") ? <div>Email already in use</div> : <div></div>}
        </div>}>

        </Card>
    </div>


}