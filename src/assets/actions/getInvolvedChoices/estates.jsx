import {useEffect, useState} from "react";
import {Calendar} from "../../components/calendar.jsx";

export function EstatesMenu({StateHook}) {
    const [emenuState, emenuHook] = useState("loading")
    const [elist, elistHook] = useState(true)
    const [eItems, eHook] = useState([])
    const [calendarVal, calendarHook] = useState([])

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
        let availability = calendarVal.join(', ')
        console.log(availability)
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
                <button type="submit">Add</button>
            </form>
            <div>Select Days of Availability: </div>
            <Calendar inputHook={calendarHook}></Calendar>
            {eItems.map((item, index) => {
                return <EstateView key={index} estateInfo={item}></EstateView>
            })}
        </div>
    }
}

function EstateView({estateInfo}) {
    const style = {
        border: "3px solid black",
        borderRadius: "3px",
        padding: "1%",
        margin: "1%",
    }
    return <div style={style}>
        <div>Name: {estateInfo.name}</div>
        <div>Location: {estateInfo.location}</div>
        <div>Availability: {estateInfo.availability}</div>
        <div>ID: {estateInfo.estateID}</div>
    </div>
}