import {useContext, useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";
import {BookingSelection} from "../../components/bookingSelection.jsx";
import {PopupContext} from "../../app.jsx";

export function TransferBookings ({StateHook, goBack}) {
    const [transfers, setTransfers] = useState([])
    const [estates, setEstates] = useState([])
    const [dropoffs, setDropoffs] = useState([])
    const [popupState, popupHook, notifState, notifHook] = useContext(PopupContext)
    const addNotif = (msg) => {
        let l = notifState.slice() //change does not trigger update without this lmfao
        l.push([msg, Date.now()+1500])
        // console.log(l)
        notifHook(l)
        // console.log(notifState)
    }

    const refreshEstates = () => {
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
        req.open("GET", "api/selectEstates", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}));
        return req
    }

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
                setTransfers(response.rows)
                // console.log(response)
            }
        }
        req.open("GET", "api/getTransfers", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}));
        return req
    }
    const updateTransfer = (window, transferID, dropoffID, estateID, dropoffWindow) => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
            }
        }
        req.open("POST", "api/updateTransfer", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            window, transferID, dropoffID, estateID, dropoffWindow
        }));
        addNotif("Update Successful")
        return req
    }

    const addTransfer = (window, estateID, dropoffID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/addTransfer", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            window, estateID, dropoffID
        }))
        addNotif("Add Successful")
        return req
    }

    const deleteTransfer = (transferID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/deleteTransfer", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            transferID
        }))
        addNotif("Delete Successful")
        return req
    }

    const getDropoffs = () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {

            if (req.readyState === 4) {

                let response = JSON.parse(req.response);
                if (response.message !== "success") {
                    StateHook("login")
                    return
                }
                // console.log(response.rows)
                setDropoffs(response.rows)
                console.log(dropoffs)
                // console.log(response)
            }
        }
        req.open("GET", "api/selectDropoffs", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}));
        return req
    }

    const confirmTransfer = (transferID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "api/confirmTransfer", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            transferID
        }))
        addNotif("Update Successful")

        return req

    }



    return <BookingSelection
        confirmBooking={confirmTransfer}
        StateHook={StateHook}
        refresh={refreshEstates}
        refreshBooking={refresh}
        refreshDropoffs={getDropoffs}
        updateBooking={updateTransfer}
        addBooking={addTransfer}
        deleteBooking={deleteTransfer}
        bookings={estates}
        setBookings={setEstates}
        transfers={transfers}
        setTransfers={setTransfers}
        dropoffs={dropoffs}
        setDropoffs={setDropoffs}
    >

    </BookingSelection>
}
