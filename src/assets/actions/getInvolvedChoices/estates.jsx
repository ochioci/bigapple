import {useEffect, useState} from "react";

export function EstatesMenu({StateHook}) {
    const [emenuState, emenuHook] = useState("loading")
    const [elist, elistHook] = useState(true)
    const [eItems, eHook] = useState([])


    useEffect(() => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            emenuHook("loaded")
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message == 'success') {
                    console.log("success!")
                    eHook(response.rows)
                } else {
                    console.log("failure", response.message)
                    StateHook('login')
                }
                console.log(response)
            }
        };
        req.open("GET", "/getEstates", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}))
    }, [StateHook, elist])


    function formSubmit(e) {
        e.preventDefault();
        let name = e.target[0].value
        let location = e.target[1].value
        let availability = e.target[2].value
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    elistHook(!elist)
                } else {
                    console.log("failure")
                }
            }
        };
        req.open("POST", "/addEstate", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"name": name, "location": location, "availability": availability}))

        return false;
    }


    if (emenuState === "loading") {
        return <div>Loading estates</div>
    } else {
        return <div  onSubmit={formSubmit}>
            <div>Add an estate</div>
            <form action="/addEstate" method="POST">
                <label>Name</label>
                <input type={"text"}/>
                <label>Location</label>
                <input type={"text"}/>
                <label>Availability</label>
                <input type={"text"}/>
                <button type="submit">Add</button>
            </form>
            {eItems.map((item, index) => {
                return <div key={index}>{item.name} {item.estateID}</div>
            })}
        </div>
    }
}