import {useState} from "react";

export function ContactContent() {
    const [reqState, reqHook] = useState("waiting")
    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        gridTemplateColumns: "1fr"
    }

    function formSubmit(e) {
        e.preventDefault();
        let message = e.target[0].value
        let email = e.target[1].value
        let req = new XMLHttpRequest();
        reqHook("sending")

        req.open("POST", "/contactAPI", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"message": message, "email": email}))
        reqHook("done")
        return false;
    }

    function reset () {
        reqHook("waiting")
    }

    if (reqState == "done") {
        return <div>
            Message sent!
            <button onClick={reset}>Send another message</button>
        </div>
    }
    else if (reqState == "sending") {
        return <div>
            Waiting
        </div>
    }
    else{
        return <div  onSubmit={formSubmit} style={style}><form id ="contactForm"  action="/contactAPI" method="POST">
            <label>Send us a message</label>
            <input type={"text"}/>
            <label>Email address</label>
            <input type={"text"}/>
            <button type="submit">Send</button>
        </form></div>
    }

}