import {useContext, useEffect, useRef, useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";
import {PopupContext} from "../../app.jsx";
import {Card} from "../../components/card.jsx";
import {Collapsible} from "../../components/collapsible.jsx";
import {Calendar} from "../../components/calendar.jsx";

export function EstateBookings({StateHook, goBack}) {
    const [estates, setEstates] = useState([])
    const [popupState, popupHook, notifState, notifHook] = useContext(PopupContext)
    const [propertyMenuState, propertyMenuHook] = useState(false)
    const addNotif = (msg) => {
        let l = notifState.slice() //change does not trigger update without this lmfao
        l.push([msg, Date.now() + 1500])
        // console.log(l)
        notifHook(l)
        // console.log(notifState)
    }

    const refresh = () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {

            if (req.readyState === 4) {

                let response = JSON.parse(req.response);
                if (response.message !== "success") {
                    goBack()
                    return
                }
                // console.log(response.rows)
                setEstates(response.rows)
                // console.log(estates)
                // console.log(response)
            }
        }
        req.open("GET", "api/getEstates", true)
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
        req.open("POST", "api/updateEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability, estateID
        }));
        addNotif("Update Successful")
        return req
    }

    const addEstate = (name, location, availability, treeDetails) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/addEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability: availability, treeDetails: treeDetails
        }))
        addNotif("Add Successful")
        return req
    }



    useEffect(() => {
        refresh()
        console.log(estates)
    }, [])

    function addProperty() {
        propertyMenuHook(true)
    }

    return <div className={"estateContainer"}>
        <Card animated={false} Content={
            <div className={"estateCaption"}>
                Do you have fruit trees on your property that you’d love to share with those in need? Include information
                here about your home and the location of the trees and when they are available for harvesting by our
                volunteers. The Big Wild Apple will do the rest and ensure that your fruit makes it to food shelters.
            </div>
        }></Card>

        <Card animated={false} Content={
            <div className={"estateListContainer"}>
                <div className={"estateHeading"}>
                    {"Properties"}
                </div>
                <div className={"estateSubheading"}>
                    {estates.length == 0 ? "You have no registered properties." : <ManageProperties refresh={refresh} estates={estates}></ManageProperties>}
                </div>
                <button className={"estateButton"} onClick={addProperty}>Add a property</button>
            </div>

        }></Card>

        {propertyMenuState ? <AddPropertyMenu
            addEstate={addEstate}
            propertyMenuHook={propertyMenuHook}
            refresh={refresh}
        ></AddPropertyMenu> : <></>}
    </div>

}
// db.run("CREATE TABLE IF NOT EXISTS " +
//     "estates([name] TEXT, [location] TEXT, [availabilityDetails] TEXT, [treeDetails] TEXT," +
//     " [ownerID] INTEGER NOT NULL, [estateID] INTEGER PRIMARY KEY NOT NULL)")

function ManageProperties({estates, refresh}) {
    return <div className={"manageEstateMenu"}>
        {estates.map((estate) => {
            return <PropertyView refresh={refresh} key={estate.estateID} info={estate}></PropertyView>
        })}
    </div>
}

function PropertyView({info, refresh}) {
    const [expanded, setExpanded] = useState(false);
    const [availExpanded, setAvailExpanded] = useState(false);
    const [availability, setAvailability] = useState([]);
    const calendarSelected = useRef([])
    const startTime = useRef("08:00");
    const endTime = useRef("20:00");

    const deleteEstate = (estateID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/deleteEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            estateID
        }))
        return req
    }

    function addEstateAvailability(startTime, endTime, dates, estateID) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
                if (response.message !== "success") {
                    console.log("failure")
                }
            }
        }
        req.open("POST", "api/addEstateAvailability", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            startTime, endTime, dates, estateID
        }))
        return req
    }
    const refreshAvailability = () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
                if (response.message !== "success") {
                    console.log("failure")
                }
                else {
                    setAvailability(response.rows);
                }
            }
        }
        req.open("POST", "api/getEstateAvailability", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            estateID: info.estateID
        }))
    }
    useEffect(() => {
        refreshAvailability();
    }, [])
    if (expanded) {
        // console.log(availability)
        return <div className={"expandedEstateView"}>
            <div className={"expandedEstateViewContent"}>
                <div className={"estateViewItem"}>{"Name: " + info.name}</div>
                <div className={"estateViewItem"}>{"Location: " + info.location}</div>
                <div className={"estateViewItem"}>{(availability.length == 0 ? "No availability" : <AvailabilityView refreshAvailability={refreshAvailability} availability={availability}></AvailabilityView>)}</div>
                <div className={"estateViewItem"}>
                    <button onClick={() => {
                        setExpanded(false)
                    }}>Close menu
                    </button>
                    <button onClick={() => {
                        setAvailExpanded(true)
                    }}>
                        Add Availability
                    </button>
                    <button onClick={() => {
                        deleteEstate(info.estateID).onreadystatechange=refresh
                    }}>Delete Property
                    </button>
                </div>

            </div>

            {availExpanded ? <div className={"expandedAvailView"}>
                <div className={"expandedAvailViewContent"}>
                    <Calendar selected={calendarSelected}></Calendar>
                    <div className={"estateViewItem"}>Start time: <input defaultValue="08:00" onChange={(e) => {startTime.current = e.target.value}} type={"time"}/></div>
                    <div className={"estateViewItem"}>End time: <input defaultValue="20:00" onChange={(e) => {endTime.current = e.target.value}} type={"time"}/></div>
                    <button className={"estateViewItem"} onClick={() => {
                        setAvailExpanded(false)
                    }}>Go back

                    </button>
                    <button className={"estateViewItem"} onClick={() => {
                        addEstateAvailability(startTime.current, endTime.current, calendarSelected.current, info.estateID).onreadystatechange = refreshAvailability;
                        startTime.current = "08:00"
                        endTime.current= "20:00"
                        calendarSelected.current=[]
                        setAvailExpanded(false)
                    }}>Add dates
                    </button>

                </div>
            </div> : <></>}
        </div>
    }
    return <div className={"estateView"}>
        <div>{"Name: " + info.name}</div>
        <div>{"Location: " + info.location}</div>
        <div>{"Bookings: 0"}</div>
        {/*//TODO: ADD BOOKING COUNTER*/}
        <button onClick={() => {setExpanded(true)}}>Manage property</button>

    </div>
}

function AvailabilityEntry({av, refresh}) {
    const stRef = useRef(av.timeStart)
    const etRef = useRef(av.timeEnd)
    const [hasChanged, setHasChanged] = useState(false)

    function deleteEntry() {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
                if (response.message !== "success") {
                    console.log("failure")
                }
            }
        }
        req.open("POST", "api/deleteEstateAvailability", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            windowID: av.windowID
        }))
        return req
    }


    function updateEntry() {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
                if (response.message !== "success") {
                    console.log("failure")
                }
            }
        }
        req.open("POST", "api/updateEstateAvailability", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            startTime: stRef.current,
            endTime: etRef.current,
            windowID: av.windowID
        }))
        setHasChanged(false)
        return req
    }

    return <div className={"estateAvailabilityEntry"}>
        {av.date}
        <div>
            Hours Begin:
            <input onChange={(e) => {
            setHasChanged(true);
            stRef.current = e.target.value
        }} type={"time"} defaultValue={av.timeStart}/>
        </div>
        <div>
            Hours End:
            <input onChange={(e) => {
                setHasChanged(true);
                etRef.current = e.target.value
            }} type={"time"} defaultValue={av.timeEnd}/>
        </div>

        <button onClick={() => {
            deleteEntry().onreadystatechange = refresh
        }}>Delete
        </button>
        {hasChanged ? <button onClick={() => {
            updateEntry().onreadystatechange = refresh}}>Update</button> : <></>}
    </div>
}

function AvailabilityView({availability, refreshAvailability}) {
    // console.log(availability);
    return <div>
        <div>Availability: </div>
        {
        availability.map((av) => {
            return <AvailabilityEntry refresh={refreshAvailability} key={av.windowID} av={av}></AvailabilityEntry>
        })
    }</div>
}


function AddPropertyMenu({propertyMenuHook, addEstate, refresh}) {

    function submitAddProperty(e) {
        e.preventDefault()
        console.log(e)
        let name = e.target[0].value
        let location = [e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value]
        let availability = e.target[5].value
        let treeDetails = e.target[6].value
        addEstate(name, location, availability, treeDetails).onreadystatechange = refresh
        propertyMenuHook(false)
    }

    return <div className={"addEstateContainer"}>
        <form onSubmit = {submitAddProperty} className={"addEstateMenu"}>
            <div className={"estateHeading"}>Add a property</div>
            <label>Name</label>
            <input type={"text"}/>
            <label>Address</label>
            <input type={"text"}/>
            <label>City</label>
            <input type={"text"}/>
            <label>State</label>
            <input type={"text"}/>
            <label>Zip Code</label>
            <input type={"number"}/>
            <label hidden>Availability</label>
            <input style={{display: "None"}} type={"text"}/>
            <label>Tree Details
            </label>
            <textarea placeholder={"                Please use this space to tell us about the location of the trees on the property, how many trees there are and what types and if you plan to be home when the volunteers come or are ok with the volunteers being on the property without you home.\n"}></textarea>
            <div>
                <button className={"estateButton"} type={"submit"}>Add</button>
                <button onClick={() => {propertyMenuHook(false)}} className={"estateButton"}>Cancel</button>
            </div>

        </form>
    </div>
}