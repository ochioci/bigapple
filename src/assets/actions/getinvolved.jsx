import {useState} from "react";
import {Calendar} from "../components/calendar.jsx"
import {EstateBookings} from "./getInvolvedChoices/estates.jsx";
import {DropoffBookings} from "./getInvolvedChoices/dropoffs.jsx";
import {TransferBookings} from "./getInvolvedChoices/transfers.jsx";

export function GetInvolvedContent ({StateHook}) {

    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        gridTemplateColumns: "1fr"
    }

    const [getInvolvedState, getInvolvedHook] = useState("choice");

    function goBack() {
        getInvolvedHook("choice");
    }

    if (getInvolvedState === "have") {
        return <div><EstateBookings StateHook={StateHook}></EstateBookings>
            <button onClick={goBack}>Go Back</button></div>
    } else if (getInvolvedState === "pick") {
        return <><TransferBookings StateHook={StateHook}></TransferBookings>
            <button onClick={goBack}>Go Back</button></>
    } else if (getInvolvedState === "get") {
        return <div><DropoffBookings StateHook={StateHook}></DropoffBookings>
            <button onClick={goBack}>Go Back</button></div>
    } else {
        return <div style={style}>
            <GetInvolvedChoices getInvolvedHook={getInvolvedHook}></GetInvolvedChoices>
        </div>
    }
}

function HaveFruit() {
    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
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
    <button onClick={getFruit}>I wish to receive fruits</button>
        </div>
}