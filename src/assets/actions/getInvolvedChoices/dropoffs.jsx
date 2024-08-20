import {useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";

export function DropoffBookings({StateHook, goBack}) {
    const [dropoffs, setDropoffs] = useState([])

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
        req.open("GET", "/getDropoffs", true)
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
        req.open("POST", "/updateDropoff", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability, dropoffID
        }));
        return req
    }

    const addDropoff = (name, location, availability) => {
        let req = new XMLHttpRequest();
        req.open("POST", "/addDropoff", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability: availability.join(",")
        }))
        return req
    }

    const deleteDropoff = (dropoffID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "/deleteDropoff", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            dropoffID
        }))
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