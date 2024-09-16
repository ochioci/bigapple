import {useContext, useState} from "react";
import {Card} from "../components/card.jsx";
import {PopupContext} from "../app.jsx";

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
            display: "flex",
            // gridTemplateRows: "10vh auto auto auto 10vh",
            height: "100%",
            justifyItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center"
        }
        return <div style={style}>
            <div></div>
                <RoleTitle reqHook={reqHook} val={"Estate"} title={"Share Fruit"}></RoleTitle>
                {/*<RoleTitle reqHook={reqHook} val={"Shelter"} title={"I operate a food bank"}></RoleTitle>*/}
                <RoleTitle reqHook={reqHook} val={"Picker"} title={"Pick Fruit"}></RoleTitle>
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
    const [popupState, popupHook, notifState, notifHook] = useContext(PopupContext)

    function formSubmit(e) {
        e.preventDefault();
        let firstname = e.target[0].value
        let lastname = e.target[1].value
        let email = e.target[2].value
        let phoneNumber = e.target[3].value
        let password = e.target[4].value
        // let userRole = e.target[4].value
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    StateHook("login")
                } else {
                    popupHook("Email is already in use")
                    reqHook("roleSelect")
                    console.log("failure")
                }
            }
        };


        req.open("POST", "api/register", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"firstname": firstname, "lastname": lastname, "email": email, "password": password, "phoneNumber": phoneNumber, "userRole": reqState}))

        return false;
    }

    return <div style={{marginTop: "min(10vh, 3vw)", width: "min(90vh, 90vw, 90%)"}}>
        <Card Content={<div className={"registerContainer"} onSubmit={formSubmit} >
            <div style={{fontSize: "5vh", fontFamily: "JustSansBold"}}>Register {reqState == "Estate" ? "to share fruits" : "to pick fruits"}</div>
            <form style={{fontSize: "3vh"}} action="/register" method="POST">
                <label>First Name</label>
                <input type={"text"}/>
                <label>Last Name</label>
                <input type={"text"}/>
                <label>Email</label>
                <input type={"text"}/>
                <label>Phone Number</label>
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