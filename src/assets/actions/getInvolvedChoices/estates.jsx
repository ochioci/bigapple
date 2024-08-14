import {useEffect, useRef, useState} from "react";
import {Calendar} from "../../components/calendar.jsx";

export function EstatesMenu({StateHook}) {
    const [emenuState, emenuHook] = useState("loading")
    const [elist, elistHook] = useState(true)
    const [eItems, eHook] = useState([])
    const [calendarVal, calendarHook] = useState([])
    const [toDelete, setToDelete] = [[], (td) => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            emenuHook("loaded")
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message == 'success') {
                    // console.log("success!")
                    elistHook(!elist)
                } else {
                    console.log("failure", response.message)
                    // StateHook('login')
                }
                // console.log(response)
            }
        };
        req.open("POST", "/deleteEstate", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({estateID: td}))
    }]



    useEffect(() => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            emenuHook("loaded")
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message == 'success') {
                    // console.log("success!")
                    eHook(response.rows)
                } else {
                    // console.log("failure", response.message)
                    StateHook('login')
                }
                // console.log(response)
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
        let availability = calendarVal;
        availability = availability.map((item) => {
            return (item + "(" + e.target[2].value + "-" + e.target[3].value + ")")
        })
        // console.log(availability)
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
        req.send(JSON.stringify({"name": name, "location": location, "availability": availability.join(",")}))

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
                <label>Start hours:</label>
                <input type={"time"} defaultValue={"08:00"}/>
                <label>End hours:</label>
                <input type={"time"} defaultValue={"20:00"}/>
                <button type="submit">Add</button>
            </form>
            <div>Select Days of Availability: </div>
            <Calendar inputHook={calendarHook}></Calendar>
            {eItems.map((item, index) => {
                return <EstateView toDelete={toDelete} setToDelete={setToDelete} updateState={elist} triggerUpdate={elistHook} key={index} estateInfo={item}></EstateView>
            })}
        </div>
    }
}

function EstateView({estateInfo, triggerUpdate, updateState, toDelete, setToDelete}) {
    const newTimes = useRef([])
    const style = {
        border: "3px solid black",
        borderRadius: "3px",
        padding: "1%",
        margin: "1%",
    }
    function deleteEstate() {
        setToDelete(estateInfo.estateID)
        //TODO:: figure out how to delete without deleting from list of nodes (index offset will cause array out of bounds)
    }

    const [addTimesState, addTimesHook] = useState(false)
    function toggleAddTimes() {
        addTimesHook(!addTimesState);
    }



    let at = <div><button onClick={toggleAddTimes}>Add times</button></div>
    let startTime = "08:00"
    let endTime = "20:00"

    function addDates() {
        // console.log(newTimes.current)
        // console.log(startTime, endTime)
        let nt = newTimes.current.map( (item) => {return item + "(" + startTime + "-" + endTime + ")"}).join(",")
        console.log(nt)

        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    console.log("updated estate")
                    triggerUpdate(!updateState)
                } else {
                    console.log("failure")
                }
            }
        };
        if (estateInfo.availability.length > 0) {
            estateInfo.availability += ","
        }
        req.open("POST", "/updateEstate", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"name": estateInfo.name, "location": estateInfo.location, "availability": estateInfo.availability + nt, "estateID": estateInfo.estateID}))

    }

    if (addTimesState) {
        at = <div style={style}>
            <button onClick={toggleAddTimes}>Close</button>
            <Calendar updateOnSubmit={true} inputHook={
                (toAdd) => {
                    newTimes.current = toAdd
                    console.log(newTimes)
                }
            }></Calendar>
            <input type={"time"} defaultValue={"08:00"} onChange={(e) => {startTime = e.target.value}}/>
            <input type={"time"} defaultValue={"20:00"} onChange={(e) => {endTime = e.target.value}}/>
            <button onClick={addDates}>Add dates</button>
        </div>
    }


    return <div style={style}>
        <div>Name: {estateInfo.name}</div>
        <div>Location: {estateInfo.location}</div>
        <div>ID: {estateInfo.estateID}</div>
        <PickupMenu toDelete={toDelete} setToDelete={setToDelete} updateState={updateState}
                    triggerUpdate={triggerUpdate} estateInfo={estateInfo}></PickupMenu>
        <button onClick={deleteEstate}>Delete</button>
        {at}
    </div>
}

function PickupMenu({estateInfo, triggerUpdate, updateState, toDelete, setToDelete}) {
    let [open, openHook] = useState(false)
    let av = estateInfo.availability.split(",")
    let info = av
    let infoHook = (e) => {
        console.log(e) //TODO:: DO BACKEND STUFF HERE
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response)
                if (response.message === "success") {
                    console.log("updated estate")
                    triggerUpdate(!updateState)
                } else {
                    console.log("failure")
                }
            }
        };
        req.open("POST", "/updateEstate", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({"name": estateInfo.name, "location": estateInfo.location, "availability": info.join(','), "estateID": estateInfo.estateID}))
    }
    if (open) {
        return <div onClick={toggle}>Availability: {info.map((item, index) => {
            return <PickupWindow estateID={estateInfo.estateID} toDelete={toDelete} setToDelete={setToDelete} key={index} index={index} pickupInfo={item} infoHook={infoHook} info={info}></PickupWindow>
        })}</div>
    } else {
        return <div onClick = {toggle} >{"Availability: ..."}</div>
    }

    function toggle (e) {
        if (e.target.nodeName !== "INPUT" && e.target.nodeName !== "BUTTON") {
            openHook(!open)
        }
    }
}

function PickupWindow({toDelete, setToDelete, pickupInfo, index, infoHook, info, estateID}) {
    let dt = pickupInfo
    let [date, time] = [dt.slice(0, dt.indexOf("(")), dt.slice(dt.indexOf("(")+1, dt.length-1)]
    let [startTime, endTime] = [useRef(time.slice(0,5)), useRef(time.slice(6, 13))]

    function submit () {
        if ((startTime.current.length !==5) || (endTime.current.length !== 5) || (date.length == 0)) {
            return;
        }
        let temp = info
        console.log(temp)
        temp[index] = temp[index].slice(0, temp[index].indexOf("(")) + "(" + startTime.current + "-" + endTime.current + ")"
        console.log(temp[index])
        infoHook(temp)
    }

    function deleteTime() {
        let temp  = info
        temp.splice(index, 1)
        infoHook(temp)
    }


    // console.log(date)
    if (startTime.current.length == 0 || endTime.current.length == 0 || date.length == 0) {
        return <div>
            No availability
        </div>
}
    return <div>
        --{date}
        <input type={'time'} defaultValue = {startTime.current} onChange={(e) => {startTime.current = e.target.value;}} />
        <input type={'time'} defaultValue = {endTime.current} onChange={(e) => {endTime.current = e.target.value;}}/>
        <button onClick={submit}>Submit</button> <button onClick={deleteTime}>Delete</button>
    </div>
}