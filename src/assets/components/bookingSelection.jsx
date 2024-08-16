import {useEffect, useState} from "react";
import {Collapsible} from "./collapsible.jsx";
const style= {
    border: "0.5vw solid black",
    borderRadius: "0.25vw",
    padding: "1vw",
    margin: "1vw",
    display: "block"
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
        <MyTransfers updateTransfer={updateBooking} dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs} transfers={transfers} setTransfers={transfers} deleteBooking={deleteBooking} refreshBooking={refreshBooking}></MyTransfers>

        <div>
            Available Estates:
            <br/>
           {
               bookings.map((booking, index) => {
                   return <Collapsible style={style} initState={true} key={index} title={booking.name} Content={
                       <EntrySelection refreshTransfers={refreshBooking} addBooking={addBooking} style={style} bookingInfo={booking}></EntrySelection>
                   }></Collapsible>
               })
           }
       </div>
    </div>
}

function MyTransfers({updateTransfer, transfers, setTransfers, deleteBooking, refreshBooking, dropoffs, setDropoffs, refreshDropoffs}) {
    // console.log(transfers)
    return <div>
        My Dropoffs:{
        transfers.map((transfer, index) => {
            return <TransferView updateTransfer={updateTransfer} dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs} transferInfo={transfer} key={index} deleteTransfer={deleteBooking} refreshTransfers={refreshBooking}></TransferView>
        })
    }
    </div>
}

function TransferView({updateTransfer, transferInfo, deleteTransfer, refreshTransfers, dropoffs, setDropoffs, refreshDropoffs}) {
    console.log(dropoffs)
    if (transferInfo.dropoffID == -1) {
        return <div style={style}>{transferInfo.window}
        <button onClick={() => {
            deleteTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
        }}>Delete</button>
            <Collapsible title={"Select dropoff"} Content = {
                <DropoffSelection refreshTransfers={refreshTransfers} transferInfo={transferInfo} updateTransfer={updateTransfer} dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs} ></DropoffSelection>
            }></Collapsible>
        </div>
    }

    let thisDropoff = dropoffs.filter((d) => {return d.dropoffID == transferInfo.dropoffID})[0]
    console.log(thisDropoff)
    return <div style={style}>
        {transferInfo.window}
        <button onClick={() => {
            deleteTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
        }}>Delete</button>
        <br/>
        Drop off at: {thisDropoff.name}
        <br/>
        Location: {thisDropoff.location}
    </div>
}

function EntrySelection({refreshTransfers, bookingInfo, addBooking}) {
    // console.log(bookingInfo)
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
        let a = addBooking(info, bookingInfo.estateID, -1)
        if (a !== undefined) {
            a.onreadystatechange = refreshTransfers
        }

        console.log("Booking: ", info)
    }}> Book </button></div>
}

function DropoffSelection({dropoffs, setDropoffs, refreshDropoffs, updateTransfer, transferInfo, refreshTransfers}) {
    // console.log(dropoffs)
    return <div style={style}>
        {

            dropoffs.map((d, index) => {
                return <div key={index}>
                    <DropoffView refreshTransfers={refreshTransfers} refreshDropoffs={refreshDropoffs} transferInfo={transferInfo} updateTransfer={updateTransfer} dropoffInfo={d}></DropoffView>
                </div>
            })
        }
    </div>
}

function DropoffView({refreshDropoffs, dropoffInfo, updateTransfer, transferInfo, refreshTransfers}) {
    console.log(dropoffInfo)
    return <div style={style}>
        Name: {dropoffInfo.name}
        <br/>
        Availability:

        {/*using the window selection for this is very hacky
           we will need to replace these anonymous functions that do nothing
        */}
        <Collapsible style={{display: "inline"}} title={""} Content={dropoffInfo.availability.split(",").map((window, index) => {
        return (
            <WindowSelection refreshTransfers={() => {}} bookingInfo={dropoffInfo} addBooking={(e) => {
                updateTransfer(transferInfo.window, transferInfo.transferID, dropoffInfo.dropoffID, transferInfo.estateID).onreadystatechange= refreshTransfers
            }} key={index} style={style} info={dropoffInfo.availability}></WindowSelection>
        )
    })}></Collapsible>
    </div>
}