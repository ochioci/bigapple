import {useState} from "react";

export function GetInvolvedContent () {

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
        return <><HaveFruit>
        </HaveFruit>
            <button onClick={goBack}>Go Back</button></>
    } else if (getInvolvedState === "pick") {
        return <><PickFruit>
        </PickFruit>
            <button onClick={goBack}>Go Back</button></>
    } else if (getInvolvedState === "get") {
        return <><GetFruit>
        </GetFruit>
            <button onClick={goBack}>Go Back</button></>
    } else {
        return <div style={style}>
            <GetInvolvedChoices getInvolvedHook={getInvolvedHook}></GetInvolvedChoices>
        </div>
    }
}

function HaveFruit() {
    return <div>
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