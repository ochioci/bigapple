import {useEffect, useReducer, useRef, useState} from "react";
import {Calendar} from "../../components/calendar.jsx";
import {Collapsible} from "../../components/collapsible.jsx";

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
        req.send(JSON.stringify({
            name, location, availability: availability.join(",")
        }))
        return req
    }

    const deleteEstate = (estateID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "/deleteEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            estateID: estateID
        }))
        return req
    }

    useEffect(() => {refresh()}, [])
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw"
    }
    return <div style={style}>
        <Collapsible initState={true} Content={<>
            <AddEstate estates={estates} setEstates={setEstates} refresh={refresh} doAdd={addEstate}></AddEstate>
        </>} title={"Add Estate"}>

        </Collapsible>
        <br/>
        <button onClick={refresh}>Refresh</button>

        {estates.map((item) => {
            return <Collapsible initState={true} key={item.estateID}title={item.name + " estate"} Content={
                <EstateView key={item.estateID} doDelete={deleteEstate} estateInfo={item} setEstates={setEstates} refresh={refresh}
                            doUpdate={updateEstate}></EstateView>
            }></Collapsible>
        })}

    </div>
}

export function AddEstate({estates, setEstates, refresh, doAdd}) {
    const dates = useRef([])
    const name = useRef("")
    const location = useRef("")
    const startTime = useRef("08:00")
    const endTime = useRef("20:00")
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw"
    }
    return <div style={style}>
        <Calendar selected={dates}></Calendar>
        <input type={"text"} placeholder={"name"} onChange={(e) => (name.current = e.target.value)}/>
        <input type={"text"} placeholder={"location"} onChange={(e) => (location.current = e.target.value)}/>
        <input type={"time"} defaultValue={"08:00"} onChange={e => (startTime.current = e.target.value)}/>
        <input type={"time"} defaultValue={"20:00"} onChange={e => (endTime.current = e.target.value)}/>
        <button onClick={() => {
            doAdd(name.current, location.current, dates.current.map((d) => {return d + "(" + startTime.current + "-" + endTime.current + ")"})).onreadystatechange = refresh
        }}>Add days</button>
    </div>
}


function EstateView({estates, setEstates, estateInfo, refresh, doUpdate, doDelete}) {
    // console.log(estateInfo)
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw"
    }
    let [dates, datesHook] = useState(estateInfo.availability.split(",").map((d, index) => {return [d, index]}))
    const datesToAdd = useRef([])
    const startTime = useRef("08:00");
    const endTime = useRef("20:00");
    return <div style={style}>
        <div>Name: {estateInfo.name}</div>
        <div>Location: {estateInfo.location}</div>
        <div>ID: {estateInfo.estateID}</div>
        <Collapsible onClick={refresh} title={"Availability"} Content={
            dates.map((date) => {
                return <div key={Math.random()}><DateView key={date[1]} estates={estates} estateInfo={estateInfo} setEstates={setEstates} datesList={dates} datesHook={datesHook} refresh={refresh} doUpdate={doUpdate} date={date[0]} lookupKey={date[1]}></DateView>
                </div>
            })}>

        </Collapsible>
        <Collapsible  title={"Add dates"} Content={<>
            <Calendar selected={datesToAdd}></Calendar>
            <button onClick={
                () => {
                    let av = dates.map((item) => {return item[0]}).concat(datesToAdd.current.map((item) => {
                        return item + "(" + startTime.current + "-" + endTime.current + ")"
                    }))
                    let av2 = av.map((d, index) => {return [d, index]})
                    console.log(av)
                    console.log(av2)
                    doUpdate(estateInfo.name, estateInfo.location, av.join(","), estateInfo.estateID)
                    datesHook(av2)
                }
            }>Submit</button>
            <input type={"time"} defaultValue={"08:00"} onChange={e => (startTime.current = e.target.value)}/>
            <input type={"time"} defaultValue={"20:00"} onChange={e => (endTime.current = e.target.value)}/>
        </>}></Collapsible>
        <button onClick={() => {
            doDelete(estateInfo.estateID).onreadystatechange = refresh
        }}>Delete</button>
    </div>
}

function DateView({estates, setEstates, estateInfo, datesList, refresh, doUpdate, date, lookupKey, datesHook}) {
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw"
    }

    let p = date.indexOf("(")
    const day = useRef(date.slice(0, p) || "")
    const startTime = useRef(date.slice(p+1, p+6) || "")
    const endTime = useRef(date.slice(p+7, p+12) || "")
    if ((day.current.length == 0) || (startTime.current.length < 5) || (endTime.current.length < 5) || datesList.length==0) {
        return <div style={{display: "None"}}></div>
    }
    return <div style={style}>
        <input type={"date"} defaultValue={new Date(day.current).toLocaleDateString("en-CA")}/>
        <input type={"time"} defaultValue={startTime.current} onChange={(e) => {
            startTime.current = e.target.value
        }}/>
        <input type={"time"} defaultValue={endTime.current} onChange={(e) => {
            endTime.current = e.target.value
        }}/>
        <button onClick={() => {
            if ((day.current.length == 0) || (startTime.current.length < 5) || (endTime.current.length < 5)) {
                return
            }
            let temp = datesList.filter((item) => {
                return item[1] !== lookupKey
            })
            temp.push([day.current + "(" + startTime.current + "-" + endTime.current + ")", Math.random()])
            // console.log(temp)
            doUpdate(estateInfo.name, estateInfo.location, temp.map((item) => {
                return item[0]
            }).join(","), estateInfo.estateID).onreadystatechange = refresh //this shit is genius
            datesHook(temp)
        }}>Update
        </button>
        <button onClick={() => {
            if ((day.current.length == 0) || (startTime.current.length < 5) || (endTime.current.length < 5)) {
                return
            }
            let temp = datesList.filter((item) => {
                return item[1] !== lookupKey
            })
            // console.log(temp)
            doUpdate(estateInfo.name, estateInfo.location, temp.map((item) => {
                return item[0]
            }).join(","), estateInfo.estateID).onreadystatechange = refresh
            datesHook(temp)
        }}>Delete
        </button>
    </div>

}