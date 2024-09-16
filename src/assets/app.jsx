import {createContext, useContext, useEffect, useRef, useState} from "react";
import {Card} from "./components/card.jsx";
export const PopupContext = createContext([]);

export function Main({GlobalState, sd, sdHook, Content, StateHook, AuthHook, AuthState}) {
    const [loginState, loginHook] = useState("Log in");
    const [role, roleHook] = useState("");
    const [popupState, popupHook] = useState("None");
    const [notifState, notifHook] = useState([])
    // const [isAbsolute, setAbsolute] = useState(false)
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
        ["Our Story", "aboutus"],
        ["Donate", "contact"],
        [loginState, "login"],
        ["Register", "register"]
    ])

    return <PopupContext.Provider value={[popupState, popupHook, notifState, notifHook]}>
        <div style={style}>
            <PopUp ></PopUp>
            <Notif></Notif>
            <div style={style} className={"homepageBG"}></div>

            <div style={{
                display: "grid",
                gridTemplateRows: "min-content 80%",
                height: "100%"
            }}>
                <TopBar  entries={entries} entriesHook={entriesHook} LoginState={loginState} LoginHook={loginHook}
                         AuthHook={AuthHook} AuthState={AuthState} StateHook={StateHook}></TopBar>


                <Content entries={entries} entriesHook={entriesHook} LoginHook={loginHook} LoginState={loginState}
                         StateHook={StateHook} AuthHook={AuthHook} AuthState={AuthState}></Content>
            </div>

        </div>
    </PopupContext.Provider>


}

function Heading({text}) {
    const style = {
        fontSize: "min(4vh, 6vw)",
        fontFamily: 'Geometos',

    }
    return <div style={style}>{text}
    </div>
}


function Tagline({text}) {
    const style = {
        fontSize: "min(2vh, 2.35vw)",
        fontFamily: "JustSansRegular",
        marginLeft: "0.5vw",
        marginBottom: "min(1vw, 1vh)"
    }
    return <div style={style}>{text}</div>
}

function Logo ({StateHook}) {
    return <div className={"logo"} style={{flexWrap: "nowrap"}}>
        <Icon></Icon>
        <div className={"homepageCol"}>
            <Heading text={"The Big Wild Apple"}></Heading>
            {/*<Tagline text={"A New York based nonprofit"}></Tagline>*/}
            {/*<button onClick={() => {*/}
            {/*    StateHook("getinvolved")*/}
            {/*}}>Go to Dashboard*/}
            {/*</button>*/}
        </div>
    </div>
}

function Icon() {
    const style = {
        aspectRatio: "1/1",
        width: "min(10vh, 10vw)",
        height: "min(10vh, 10vw)"
    }
    return <img style={style} src={"/icon.png"} alt={"Icon"}/>
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

export function TopBar({ StateHook, AuthState, AuthHook, LoginState, LoginHook, entries, entriesHook}) {
    // console.log(isAbsolute)
    const [isOverlay, setOverlay] = useState(false)
    // console.log(isOverlay)
    useEffect(() => {
        // setAbsolute(true)
        const options = {
            rootMargin: "0px",
            threshold: 0.0,
        };
        // console.log("observer set")
        const exitObserver = new IntersectionObserver((entries) => {
            // console.log(entries[0].isVisible)
            // console.log(entries[0])
            if (entries[0].isIntersecting == false) {
                setOverlay(true)
            } else {
                setOverlay(false)
            }
        }, options);

        const options2 = {
            rootMargin: "0px",
            threshold: 1.0
        }


        exitObserver.observe(document.querySelector(".topbar"))
        // entryObserver.observe(document.querySelector(".tbAnimate"))

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
                        ["Our Story", "aboutus"],
                        ["Get involved", "getinvolved"],
                        ["Donate", "contact"],
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


    const entryStyle = {
        margin: "0%"
    }

    if (isOverlay) {
        return <>
            <div className={"topbar"}>
                <Logo StateHook={StateHook}></Logo>
                <div className={"topbarEntries"}>
                    {entries.map((text) =>
                        <TopBarEntry StateHook={StateHook} link={text[1]} style={entryStyle} text={text[0]} key={text}/>
                    )}
                    <TopBarAuthStatus StateHook={StateHook} AuthState={AuthState} AuthHook={AuthHook}
                                      style={entryStyle}></TopBarAuthStatus>
                </div>
            </div>
            <div className={"topbar tbAnimate"} >
                <Logo StateHook={StateHook}></Logo>
                <div className={"topbarEntries"}>
                    {entries.map((text) =>
                        <TopBarEntry StateHook={StateHook} link={text[1]} style={entryStyle} text={text[0]} key={text}/>
                    )}
                    <TopBarAuthStatus StateHook={StateHook} AuthState={AuthState} AuthHook={AuthHook}
                                      style={entryStyle}></TopBarAuthStatus>
                </div>
            </div>

        {/*<div style={{display: "none"}} className={"topbar"}>*/}
        {/*    <Logo StateHook={StateHook}></Logo>*/}
        {/*    <div className={"topbarEntries"}>*/}
        {/*        {entries.map((text) =>*/}
        {/*            <TopBarEntry StateHook={StateHook} link={text[1]} style={entryStyle} text={text[0]} key={text}/>*/}
        {/*        )}*/}
        {/*        <TopBarAuthStatus StateHook={StateHook} AuthState={AuthState} AuthHook={AuthHook}*/}
        {/*                          style={entryStyle}></TopBarAuthStatus>*/}
        {/*    </div>*/}
        {/*</div>*/}
        </>

    }

    return <>
        {/*<div className={"topbar tbAnimate"} style={{display: "none"}}>*/}
        {/*    <Logo StateHook={StateHook}></Logo>*/}
        {/*    <div className={"topbarEntries"}>*/}
        {/*        {entries.map((text) =>*/}
        {/*            <TopBarEntry StateHook={StateHook} link={text[1]} style={entryStyle} text={text[0]} key={text}/>*/}
        {/*        )}*/}
        {/*        <TopBarAuthStatus StateHook={StateHook} AuthState={AuthState} AuthHook={AuthHook}*/}
        {/*                          style={entryStyle}></TopBarAuthStatus>*/}
        {/*    </div>*/}
        {/*</div>*/}

        <div className={"topbar"}>
            <Logo StateHook={StateHook}></Logo>
            <div className={"topbarEntries"}>
                {entries.map((text) =>
                    <TopBarEntry StateHook={StateHook} link={text[1]} style={entryStyle} text={text[0]} key={text}/>
                )}
                <TopBarAuthStatus StateHook={StateHook} AuthState={AuthState} AuthHook={AuthHook}
                                  style={entryStyle}></TopBarAuthStatus>
            </div>

        </div>
    </>


}

function TopBarEntry({StateHook, link, style, text}) {
    // console.log(StateHook)

    function handleClick(e) {
        // console.log(StateHook)
        e.preventDefault();
        StateHook(link);
    }

    return <a className={"topbarEntry"} onClick={handleClick} href={link} style={style}>{text}</a>
}

function TopBarAuthStatus({StateHook, AuthState, AuthHook, style}) {
    if (AuthState === "---") {
        return <div className={"topbarEntry"} style={style}>Not logged in</div>
    }
    return <div className={"topbarEntry"} style={style}>{"Logged in as: " + AuthState}</div>
}