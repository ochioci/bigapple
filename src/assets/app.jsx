import {useState} from "react";

export function Main({sd, sdHook, Content, StateHook, AuthHook, AuthState}) {
    const [loginState, loginHook] = useState("Log in");
    const style = {
        gridTemplateRows: "10% auto",
        gridTemplateColumns: "100%",
        display: "grid",
        width: "100vw",
        height: "100vh",
        margin: 0
    }
    let [entries, entriesHook] = useState([
        ["Home", "home"],
        ["About us", "aboutus"],
        ["Get involved", "getinvolved"],
        ["Contact", "contact"],
        [loginState, "login"],
        ["Register", "register"]
    ])

    return <div style={style}>
        <TopBar entries={entries} LoginState={loginState} LoginHook={loginHook} AuthHook={AuthHook} AuthState={AuthState} StateHook={StateHook}></TopBar>
        <Content entries={entries} entriesHook={entriesHook} LoginHook={loginHook} LoginState={loginState} StateHook={StateHook} AuthHook={AuthHook} AuthState={AuthState}></Content>
    </div>
}

function TopBar({StateHook, AuthState, AuthHook, LoginState, LoginHook, entries}) {
    const style = {
        backgroundColor: "blue",
        width: "100vw",
        height: "100%",
        gridRow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
    }

    const entryStyle = {
        color: "White",
        marginRight: "5%"
    }
    return <div style={style}>
        {entries.map((text) =>
            <TopBarEntry StateHook={StateHook} link={text[1]} style={entryStyle} text={text[0]} key={text} />
        )}
        <TopBarAuthStatus StateHook={StateHook} AuthState={AuthState} AuthHook={AuthHook} style={entryStyle}></TopBarAuthStatus>
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

function TopBarAuthStatus({StateHook, AuthState, AuthHook, style}) {
    if (AuthState=== "---") {
        return <div style={style}>Not logged in</div>
    }
    return <div style={style}>{"Logged in as: " + AuthState}</div>
}