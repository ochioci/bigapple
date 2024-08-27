import {createContext, useContext, useEffect, useRef, useState} from "react";
import {Card} from "./components/card.jsx";
export const PopupContext = createContext([]);

export function Main({GlobalState, sd, sdHook, Content, StateHook, AuthHook, AuthState}) {
    const [loginState, loginHook] = useState("Log in");
    const [role, roleHook] = useState("");
    const [popupState, popupHook] = useState("None");
    const [notifState, notifHook] = useState([])
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

    return <PopupContext.Provider value={[popupState, popupHook, notifState, notifHook]}>
        <div style={style}>
            <PopUp ></PopUp>
            <Notif></Notif>
            <div style={style} className={"homepageBG"}></div>
            {GlobalState != "home" ?
                <TopBar entries={entries} entriesHook={entriesHook} LoginState={loginState} LoginHook={loginHook}
                        AuthHook={AuthHook} AuthState={AuthState} StateHook={StateHook}></TopBar> : <></>
            }

            <Content entries={entries} entriesHook={entriesHook} LoginHook={loginHook} LoginState={loginState}
                     StateHook={StateHook} AuthHook={AuthHook} AuthState={AuthState}></Content>
        </div>
    </PopupContext.Provider>


}

function Notif () {
    const [popupState, popupHook, notifState, notifHook] = useContext(PopupContext)
    // console.log(notifState.length)
    // useEffect(() => {
    //     setInterval( () => {
    //         let a = notifState.filter( (item) => {
    //             return (item[1] > Date.now())
    //         })
    //         notifHook(a)
    //     }, 1000)
    // })
    // setTimeout( () => {
    //     let a = notifState.filter( (item) => {
    //         return ((new Date(item[1]).getTime() + 3000) > (new Date (Date.now()).getTime()))
    //     } )
    //     notifHook(a)
    // }, 3000)
    return <div className={"notif"}>
    {
        notifState.map((item, index) => {
            return <div className={"notifEntry"} key={index}>

                    <div>{item[0]}</div>

            </div>
        })
    }
    </div>
}

function PopUp({popupFadeID}) {
    const [popupState, popupHook, notifState, notifHook] = useContext(PopupContext)
    if (popupState !== "None") {
        return <div className={"popUp"} onClick={() => {
            popupHook("None")
        }}>

            <Card whitebg={true} Content={
                <div>{popupState}</div>

            }>

            </Card>

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