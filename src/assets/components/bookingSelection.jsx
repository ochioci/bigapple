import {useEffect, useState} from "react";
import {Collapsible} from "./collapsible.jsx";
const style= {
    border: "0.5vw solid black",
    borderRadius: "0.25vw",
    padding: "1vw",
    margin: "1vw"
}
//refresh refreshes estates
//refreshBooking refreshes booking
export function BookingSelection({StateHook, refresh, refreshBooking, updateBooking, addBooking, deleteBooking, bookings, setBookings, transfers, setTransfers}) {
    useEffect(() => {refresh()}, [])
    useEffect(() => {refreshBooking()}, [])
    // useEffect(() => {refreshBooking()}, [])
    // console.log(bookings)
    return <div style={style}>
        <MyTransfers transfers={transfers} setTransfers={transfers} deleteBooking={deleteBooking} refreshBooking={refreshBooking}></MyTransfers>
       <div style={style}>
           {
               bookings.map((booking, index) => {
                   return <Collapsible initState={true} key={index} title={booking.name} Content={
                       <EntrySelection refreshTransfers={refreshBooking} addBooking={addBooking} style={style} bookingInfo={booking}></EntrySelection>
                   }></Collapsible>
               })
           }
       </div>
    </div>
}

function MyTransfers({transfers, setTransfers, deleteBooking, refreshBooking}) {
    console.log(transfers)
    return <div> {
        transfers.map((transfer, index) => {
            return <TransferView transferInfo={transfer} key={index} deleteTransfer={deleteBooking} refreshTransfers={refreshBooking}></TransferView>
        })
    }
    </div>
}

function TransferView({transferInfo, deleteTransfer, refreshTransfers}) {
    return <div>
        {transferInfo.window}
        <button onClick={() => {
            deleteTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
        }}>Delete</button>
    </div>
}

function EntrySelection({refreshTransfers, bookingInfo, addBooking}) {
    console.log(bookingInfo)
    return <div>
        Name: {bookingInfo.name}
        <br/>
        Location: {bookingInfo.location}
        <br/>
        Availability: <Collapsible style={{display: "inline"}} title={""} Content={bookingInfo.availability.split(",").map((window, index) => {
        return (
            <WindowSelection refreshTransfers={refreshTransfers} bookingInfo={bookingInfo} addBooking={addBooking} key={index} style={style} info={window}></WindowSelection>
        )
    })}></Collapsible>
    </div>
}

function WindowSelection({refreshTransfers, info, addBooking, bookingInfo}) {
    return <div style={style}>{info} <button onClick={() => {
        addBooking(info, bookingInfo.estateID, 0).onreadystatechange = refreshTransfers
        console.log("Booking: ", info)
    }}> Book </button></div>
}