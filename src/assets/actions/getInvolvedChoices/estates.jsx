import {useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";

export function EstateBookings({StateHook, goBack}) {
    const [estates, setEstates] = useState([])

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
        req.open("GET", "https://bigappleserver-a2c91f738c7f.herokuapp.com/getEstates", true)
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
        req.open("POST", "https://bigappleserver-a2c91f738c7f.herokuapp.com/updateEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability, estateID
        }));
        return req
    }

    const addEstate = (name, location, availability) => {
        let req = new XMLHttpRequest();
        req.open("POST", "https://bigappleserver-a2c91f738c7f.herokuapp.com/addEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            name, location, availability: availability.join(",")
        }))
        return req
    }

    const deleteEstate = (estateID) => {
        let req = new XMLHttpRequest();
        req.open("POST", "https://bigappleserver-a2c91f738c7f.herokuapp.com/deleteEstate", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            estateID
        }))
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