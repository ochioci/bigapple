import {useContext, useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";
import {PopupContext} from "../../app.jsx";

export function DropoffBookings({StateHook, goBack}) {
    const [dropoffs, setDropoffs] = useState([])
    const [popupState, popupHook, notifState, notifHook] = useContext(PopupContext)
    const addNotif = (msg) => {
        let l = notifState.slice() //change does not trigger update without this lmfao
        l.push([msg, Date.now()+1500])
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
                setDropoffs(response.rows)
                // console.log(response)
            }
        }
        req.open("GET", "api/getDropoffs", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}));
        return req
    }
    const updateDropoff = (name, location, availability, dropoffID) => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
            }
        }
        req.open("POST", "api/updateDropoff", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability, dropoffID
        }));
        popupHook("Update Successful")
        return req
    }

    const addDropoff = (name, location, availability) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/addDropoff", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability: availability.join(",")
        }))
        addNotif("Add Successful")
        return req
    }

    const deleteDropoff = (dropoffID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/deleteDropoff", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            dropoffID
        }))
        addNotif("Delete Successful")
        return req
    }

    return <BookingsMenu
        StateHook={StateHook}
        title={"Dropoff"}
        id = {"dropoffID"}
        refresh={refresh}
        updateBooking={updateDropoff}
        addBooking={addDropoff}
        deleteBooking={deleteDropoff}
        bookings={dropoffs}
        setBookings={setDropoffs}
        helpText={"Use this menu to add a property for fruit dropoffs"}
    ></BookingsMenu>
}