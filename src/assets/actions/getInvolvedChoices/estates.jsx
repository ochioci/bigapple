import {useEffect, useState} from "react";
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
    if (addTimesState) {
        at = <div>
            <button onClick={toggleAddTimes}>Add times...</button>
            <Calendar updateOnSubmit={true} inputHook={
                (toAdd) => {
                    // let info = estateInfo.availability + "," + toAdd.join(",")
                    // let req = new XMLHttpRequest();
                    // req.onreadystatechange = () => {
                    //     if (req.readyState === 4) {
                    //         let response = JSON.parse(req.response)
                    //         if (response.message === "success") {
                    //             console.log("updated estate")
                    //             triggerUpdate(!updateState)
                    //         } else {
                    //             console.log("failure")
                    //         }
                    //     }
                    // };
                    // req.open("POST", "/updateEstate", true);
                    // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    // req.send(JSON.stringify({"name": estateInfo.name, "location": estateInfo.location, "availability": info, "estateID": estateInfo.estateID}))
                    console.log(toAdd)
                }
            }></Calendar>
        </div>
    }


    return <div style={style}>
        <div>Name: {estateInfo.name}</div>
        <div>Location: {estateInfo.location}</div>
        <PickupMenu toDelete={toDelete} setToDelete={setToDelete} updateState={updateState} triggerUpdate={triggerUpdate} estateInfo={estateInfo}></PickupMenu>
        <div>ID: {estateInfo.estateID}</div>
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
    let [startTime, endTime] = [(time.slice(0,5)), time.slice(6, 13)]

    function submit () {
        let temp = info
        console.log(temp)
        temp[index] = temp[index].slice(0, temp[index].indexOf("(")) + "(" + startTime + "-" + endTime + ")"
        console.log(temp[index])
        infoHook(temp)
    }

    function deleteTime() {
        let temp  = info
        temp.splice(index, 1)
        infoHook(temp)
    }


    console.log(startTime, endTime)
    if (startTime.length == 0 || endTime.length == 0) {
        return <div>
            No availability
        </div>
    }
    return <div>
        --{date}
        <input type={'time'} defaultValue = {startTime} onChange={(e) => {startTime = e.target.value;}} />
        <input type={'time'} defaultValue = {endTime} onChange={(e) => {endTime = e.target.value;}}/>
        <button onClick={submit}>Submit</button> <button onClick={deleteTime}>Delete</button>
    </div>
}