import {useContext, useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";
import {PopupContext} from "../../app.jsx";

export function EstateBookings({StateHook, goBack}) {
    const [estates, setEstates] = useState([])
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
                setEstates(response.rows)
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

    const addEstate = (name, location, availability) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/addEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability: availability.join(",")
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



    return <BookingsMenu
        StateHook={StateHook}
        title={"Estate"}
        id = {"estateID"}
        refresh={refresh}
        updateBooking={updateEstate}
        addBooking={addEstate}
        deleteBooking={deleteEstate}
        bookings={estates}
        setBookings={setEstates}
    ></BookingsMenu>
}