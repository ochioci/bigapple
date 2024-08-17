import {useEffect, useState} from "react";
export function Main({sd, sdHook, Content, StateHook, AuthHook, AuthState}) {
    const [loginState, loginHook] = useState("Log in");
    const style = {
        gridTemplateRows: "5% auto",
        gridTemplateColumns: "100%",
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
        <TopBar entries={entries} entriesHook={entriesHook} LoginState={loginState} LoginHook={loginHook} AuthHook={AuthHook} AuthState={AuthState} StateHook={StateHook}></TopBar>
        <Content entries={entries} entriesHook={entriesHook} LoginHook={loginHook} LoginState={loginState} StateHook={StateHook} AuthHook={AuthHook} AuthState={AuthState}></Content>
    </div>
}

function TopBar({StateHook, AuthState, AuthHook, LoginState, LoginHook, entries, entriesHook}) {
    useEffect( () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    console.log(response)
                    AuthHook(response.name)
                    LoginHook("Log out");
                    entriesHook([["Home", "home"],
                        ["About us", "aboutus"],
                        ["Get involved", "getinvolved"],
                        ["Contact", "contact"],
                        ["Log out", "login"],])
                } else {
                    console.log("not logged in")
                }
            }
        };
        req.open("GET", "/checkLogin", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send()
    }, [])
    const style = {

    }

    const entryStyle = {
        color: "White",
        marginRight: "5%"
    }
    return <div className={"topbar"} style={style}>
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