import {useState} from "react";

export function Main({Content, StateHook}) {
    const style = {
        gridTemplateRows: "10vh auto",
        gridTemplateColumns: "100%",
        display: "grid",
        width: "100vw",
        height: "100vh",
        margin: 0
    }

    return <div style={style}>
        <TopBar StateHook={StateHook}></TopBar>
        <Content></Content>
    </div>
}

function TopBar({StateHook}) {
    const style = {
        backgroundColor: "blue",
        width: "100vw",
        height: "100%",
        gridRow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flexStart",
    }
    const entries = [
        ["Home", "home"],
        ["About us", "aboutus"],
        ["Get involved", "getinvolved"],
        ["Contact", "contact"]
    ]
    const entryStyle = {
        color: "White",
        marginRight: "5%"
    }
    return <div style={style}>
        {entries.map((text) =>
            <TopBarEntry StateHook={StateHook} link={text[1]} style={entryStyle} text={text[0]} key={text} />
        )}
    </div>
}

function TopBarEntry({StateHook, link ,style, text}) {
    // console.log(StateHook)

    function handleClick (e) {
        // console.log(StateHook)
        e.preventDefault();
        StateHook(link);
    }

    return <a onClick={handleClick} href={link} style={style}>{text}</a>
}