import {createContext, useContext, useEffect, useRef, useState} from "react";
import {Card} from "./components/card.jsx";
export const PopupContext = createContext(["None", ()=>{}]);

export function Main({sd, sdHook, Content, StateHook, AuthHook, AuthState}) {
    const popupFadeID = useRef(Math.random())
    const [loginState, loginHook] = useState("Log in");
    const [role, roleHook] = useState("");
    const [popupState, popupHook] = useState("None");
    const style = {
        gridTemplateRows: "5% auto",
        gridTemplateColumns: "100%",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        margin: 0
    }
    let [entries, entriesHook] = useState([
        ["Home", "home"],
        ["About us", "aboutus"],
        ["Contact", "contact"],
        [loginState, "login"],
        ["Register", "register"]
    ])

    return <PopupContext.Provider value={[popupState, popupHook]}>
        <div style={style}>
            <PopUp popupFadeID={popupFadeID}></PopUp>
            <div style={style} className={"homepageBG"}></div>
            <TopBar entries={entries} entriesHook={entriesHook} LoginState={loginState} LoginHook={loginHook}
                    AuthHook={AuthHook} AuthState={AuthState} StateHook={StateHook}></TopBar>
            <Content entries={entries} entriesHook={entriesHook} LoginHook={loginHook} LoginState={loginState}
                     StateHook={StateHook} AuthHook={AuthHook} AuthState={AuthState}></Content>
        </div>
    </PopupContext.Provider>


}

function PopUp({popupFadeID}) {
    const [popupState, popupHook] = useContext(PopupContext)
    if (popupState[0] == "!") {
        let cn = "notif an"
        let e = <div className={cn} key={Math.random()}>
            <Card Content={
                <div>
                    {popupState.slice(1)}
                </div>
            }></Card>
        </div>

        return e
    }
    if (popupState !== "None") {
        return <div className={"popUp"} onClick={() => {
            popupHook("None")
        }}>
        </div>
    } else {
        return <></>
    }
}

function TopBar({StateHook, AuthState, AuthHook, LoginState, LoginHook, entries, entriesHook}) {
    useEffect(() => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    console.log(response)
                    AuthHook(response.name)
                    // roleHook(response.role)
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
        req.open("GET", "api/checkLogin", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send()
    }, [])
    const style = {

    }

    const entryStyle = {
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

    return <a className={"topbarEntry"} onClick={handleClick} href={link} style={style}>{text}</a>
}

function TopBarAuthStatus({StateHook, AuthState, AuthHook, style}) {
    if (AuthState=== "---") {
        return <div style={style}>Not logged in</div>
    }
    return <div style={style}>{"Logged in as: " + AuthState}</div>
}