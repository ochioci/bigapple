import {useEffect, useRef, useState} from "react";
import {Calendar} from "../../components/calendar.jsx";

export function EstatesMenu({StateHook}) {
    const [estates, setEstates] = useState([])

    const refresh = () => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {

                if (req.readyState === 4) {

                    let response = JSON.parse(req.response);
                    if (response.message !== "success") {
                        StateHook("login")
                        return
                    }
                    // console.log(response.rows)
                    setEstates(response.rows)
                    // console.log(response)
                }
            }
            req.open("GET", "/getEstates", true)
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.send(JSON.stringify({}));
            return req
        }

    const updateEstate = (name, location, availability, estateID) => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
            }
        }
        req.open("POST", "/updateEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability, estateID
        }));
        return req
    }

    const addEstate = (name, location, availability) => {
        let req = new XMLHttpRequest();
        req.open("POST", "/addEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(name, location, availability);
        req.send(JSON.stringify({
            name, location, availability: availability.join(",")
        }))
        return req
    }

    useEffect(() => {refresh()}, [])

    return <div>
        {
            estates.map((item) => {
                return <EstateView key={item.estateID} estateInfo={item} setEstates={setEstates} refresh={refresh} doUpdate={updateEstate}></EstateView>
            })
        }
        <AddEstate estates={estates} setEstates={setEstates} refresh={refresh} doAdd={addEstate}></AddEstate>
        <button onClick={refresh}>Refresh</button>
    </div>
}

export function AddEstate({estates, setEstates, refresh, doAdd}) {
    const dates = useRef([])
    const name = useRef("")
    const location = useRef("")
    const startTime = useRef("08:00")
    const endTime = useRef("20:00")
    return <>
        <Calendar selected={dates}></Calendar>
        <input type={"text"} placeholder={"name"} onChange={(e) => (name.current = e.target.value)}/>
        <input type={"text"} placeholder={"location"} onChange={(e) => (location.current = e.target.value)}/>
        <input type={"time"} defaultValue={"08:00"} onChange={e => (startTime.current = e.target.value)}/>
        <input type={"time"} defaultValue={"20:00"} onChange={e => (endTime.current = e.target.value)}/>
        <button onClick={() => {
            doAdd(name.current, location.current, dates.current.map((d) => {return d + "(" + startTime.current + "-" + endTime.current + ")"}))
        }}>Submit</button>
    </>
}


function EstateView({estates, setEstates, estateInfo, refresh}) {
    // console.log(estateInfo)
    return <div>
        <div>{estateInfo.name}</div>
        <div>{estateInfo.availability}</div>
        <div>{estateInfo.estateID}</div>
    </div>
}