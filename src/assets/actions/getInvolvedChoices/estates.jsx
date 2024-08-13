import {useState} from "react";

export function EstatesMenu() {
    const [emenuState, emenuHook] = useState("loading")
    // let req = new XMLHttpRequest();
    // req.onreadystatechange = () => {
    //     if (req.readyState === 4) {
    //         let response = JSON.parse(req.response)
    //         if (response.message === "success") {
    //             console.log("success!")
    //         } else {
    //             console.log("failure")
    //
    //         }
    //     }
    // };
    // req.open("GET", "/getEstates", true);
    // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // req.send()
    if (emenuState === "loading") {
        return <div>Loading estates</div>
    }
}