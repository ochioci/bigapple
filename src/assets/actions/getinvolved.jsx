import {useEffect, useState} from "react";
import {Calendar} from "../components/calendar.jsx"
import {EstateBookings} from "./getInvolvedChoices/estates.jsx";
import {DropoffBookings} from "./getInvolvedChoices/dropoffs.jsx";
import {TransferBookings} from "./getInvolvedChoices/transfers.jsx";

export function GetInvolvedContent ({StateHook}) {

    const style = {
        gridRow: 2,
        // display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "start",
        // padding: "5vh",
        flexDirection: "column",
        display: "grid",
        justifyContent: "center"
    }
    const [getInvolvedState, getInvolvedHook] = useState("choice");

    useEffect( () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    console.log(response)
                    getInvolvedHook(response.role)

                } else {
                    StateHook("login")
                    console.log("not logged in")
                }
            }
        };
        req.open("GET", "api/checkLogin", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send()
    }, [])



    function goBack() {
        getInvolvedHook("choice");
    }

    if (getInvolvedState === "Estate") {
        return <div style={style}><EstateBookings goBack={goBack} StateHook={StateHook}></EstateBookings>
            </div>
    } else if (getInvolvedState === "Picker") {
        return <div style={style}><TransferBookings goBack={goBack} StateHook={StateHook}></TransferBookings>
           </div>
    } else if (getInvolvedState === "Shelter") {
        return <div style={style}><DropoffBookings goBack={goBack} StateHook={StateHook}></DropoffBookings>
            </div>
    } else {
        return <div style={style}>
            {"Loading..."}
        </div>
    }
}

function HaveFruit() {
    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
    return <div style={style}>
        <Calendar></Calendar>
        Property owner placeholder page
    </div>
}

function PickFruit() {
    return <div>Volunteer placeholder page</div>
}

function GetFruit() {
    return <div>Shelter placeholder page</div>
}

function GetInvolvedChoices({getInvolvedHook}) {
    const style = {
        display: "flex",
        gridRow: "1",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    }

    function haveFruit() {
        getInvolvedHook("have");
    }

    function pickFruit() {
        getInvolvedHook("pick");
    }

    function getFruit() {
        getInvolvedHook("get");
    }

    return <div style={style}>
    <button onClick={haveFruit} >I have fruit trees on my property</button>
    <button onClick={pickFruit}>I wish to volunteer to pick fruit</button>
        </div>
}