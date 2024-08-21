import {useState} from "react";
import {Card} from "../components/card.jsx";

export function ContactContent({StateHook}) {
    const [reqState, reqHook] = useState("waiting")
    const style = {
        gridRow: 2,
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "JustSansRegular"
    }

    function formSubmit(e) {
        e.preventDefault();
        let message = e.target[0].value
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    console.log("sent message!")
                    reqHook("done")
                } else {
                    console.log("failure")
                    reqHook("waiting")
                    StateHook("login")
                }
            }
        };

        reqHook("sending")

        req.open("POST", "api/contactAPI", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"message": message}))
        reqHook("done")
        return false;
    }

    function reset () {
        reqHook("waiting")
    }

    if (reqState == "done") {
        return <div style={style}>
            <Card Content={
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{fontSize: "25pt", fontFamily: "JustSansBold"}}>Message sent!</div>

                    <button onClick={reset}>Send another message</button>
                </div>
            }>

            </Card>
        </div>



    } else if (reqState == "sending") {
        return <div>
            Waiting
        </div>
    }
    else{
        return <div style={style}>
            <Card Content={
                <form onSubmit={formSubmit} id="contactForm" action="/contactAPI" method="POST">
                    <label style={{
                        fontSize: "30pt",
                        fontFamily: "JustSansBold"
                    }}>Send us a message</label>
                    <input type={"text"}/>
                    <button type="submit">Send</button>
                </form>
            }>

            </Card>

        </div>
    }

}