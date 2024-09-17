import {useContext, useEffect, useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";
import {PopupContext} from "../../app.jsx";
import {Card} from "../../components/card.jsx";
import {Collapsible} from "../../components/collapsible.jsx";

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
                console.log(estates)
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

    const deleteEstate = (estateID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/deleteEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            estateID
        }))
        addNotif("Delete Successful")
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
            <div className={"estateHeading"}>
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
                    {estates.length == 0 ? "You have no registered properties." : <ManageProperties estates={estates}></ManageProperties>}
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

function ManageProperties({estates}) {
    return <div className={"manageEstateMenu"}>
        {estates.map((estate) => {
            return <PropertyView key={estate.estateID} info={estate}></PropertyView>
        })}
    </div>
}

function PropertyView({info}) {
    const [expanded, setExpanded] = useState(false);
    const [availability, setAvailability] = useState([]);
    useEffect(() => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
                if (response.message !== "success") {
                    console.log("failure")
                }
                console.log(response)
            }
        }
        req.open("POST", "api/getEstateAvailability", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            estateID: info.estateID
        }))
    }, [])
    if (expanded) {
        return <div className={"expandedEstateView"}>
            <div className={"expandedEstateViewContent"}>
                <div>{"Name: " + info.name}</div>
                <div>{"Location: " + info.location}</div>
                <div>{"Availability: "}</div>
                <button onClick={() => {setExpanded(false)}}>Close menu</button>
            </div>
        </div>
    }
    return <div className={"estateView"}>
        <div>{"Name: " + info.name}</div>
        <div>{"Location: " + info.location}</div>
        <button onClick={() => {setExpanded(true)}}>Manage property</button>

    </div>
}

function AddPropertyMenu({propertyMenuHook, addEstate, refresh}) {

    function submitAddProperty(e) {
        e.preventDefault()
        console.log(e)
        let name = e.target[0].value
        let location = e.target[1].value + ", " + e.target[2].value + ", " + e.target[3].value + ", " + e.target[4].value
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
            <label>Availability</label>
            <input type={"text"}/>
            <label>Tree Details</label>
            <input type={"text"}/>
            <div>
                <button className={"estateButton"} type={"submit"}>Add</button>
                <button onClick={() => {propertyMenuHook(false)}} className={"estateButton"}>Cancel</button>
            </div>

        </form>
    </div>
}