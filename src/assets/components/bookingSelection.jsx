import {useEffect} from "react";

export function BookingSelection({StateHook, refresh, updateBooking, addBooking, deleteBooking, bookings, setBookings}) {
    useEffect(() => {refresh()}, [])
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw"
    }

    return <div>
        {
            bookings.map((booking, index) => {
                return <div key={index}>
                    Name: {booking.name}
                    <br/>
                    Location: {booking.location}
                </div>
            })
        }
    </div>
}