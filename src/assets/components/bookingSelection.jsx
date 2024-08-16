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
export function BookingSelection({dropoffs, setDropoffs, refreshDropoffs, StateHook, refresh, refreshBooking, updateBooking, addBooking, deleteBooking, bookings, setBookings, transfers, setTransfers}) {
    useEffect(() => {refresh()}, [])
    useEffect(() => {refreshBooking()}, [])
    useEffect(() => {refreshDropoffs()}, [])
    // useEffect(() => {refreshBooking()}, [])
    // console.log(bookings)
    return <div style={style}>
        <MyTransfers dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs} transfers={transfers} setTransfers={transfers} deleteBooking={deleteBooking} refreshBooking={refreshBooking}></MyTransfers>
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

function MyTransfers({transfers, setTransfers, deleteBooking, refreshBooking, dropoffs, setDropoffs, refreshDropoffs}) {
    console.log(transfers)
    return <div> {
        transfers.map((transfer, index) => {
            return <TransferView dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs} transferInfo={transfer} key={index} deleteTransfer={deleteBooking} refreshTransfers={refreshBooking}></TransferView>
        })
    }
    </div>
}

function TransferView({transferInfo, deleteTransfer, refreshTransfers, dropoffs, setDropoffs, refreshDropoffs}) {
    if (transferInfo.dropoffID == -1) {
        return <div style={style}>{transferInfo.window}
        <button onClick={() => {
            deleteTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
        }}>Delete</button>
            <Collapsible title={"Select dropoff"} Content = {
                <DropoffSelection dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs} ></DropoffSelection>
            }></Collapsible>
        </div>
    }

    return <div>
        {transferInfo.window}
        <button onClick={() => {
            deleteTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
        }}>Delete</button>
        <br/>
        Dropoff: {transferInfo.dropoffID}
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
        addBooking(info, bookingInfo.estateID, -1).onreadystatechange = refreshTransfers
        console.log("Booking: ", info)
    }}> Book </button></div>
}

function DropoffSelection({dropoffs, setDropoffs, refreshDropoffs}) {
    console.log(dropoffs)
    return <div style={style}>
        {
            dropoffs.map((d, index) => {
                return <div key={index}>dropoff</div>
            })
        }
    </div>
}