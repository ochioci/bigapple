import {useEffect, useState} from "react";
import {Collapsible} from "./collapsible.jsx";
import {LocationView} from "./map.jsx";
import {Card} from "./card.jsx";
const style= {
    marginTop: "9vh",
    // width: "min(90vh, 90vw)"
}
//refresh refreshes estates
//refreshBooking refreshes booking
export function BookingSelection({confirmBooking, dropoffs, setDropoffs, refreshDropoffs, StateHook, refresh, refreshBooking, updateBooking, addBooking, deleteBooking, bookings, setBookings, transfers, setTransfers}) {
    useEffect(() => {refresh()}, [])
    useEffect(() => {refreshBooking()}, [])
    useEffect(() => {refreshDropoffs()}, [])
    // useEffect(() => {refreshBooking()}, [])
    // console.log(bookings)
    return <div className={"bookingSelectionContainer"}>
        <Card Content={

            <>
                <MyTransfers estates={bookings} confirmTransfer={confirmBooking} updateTransfer={updateBooking} dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs} transfers={transfers} setTransfers={transfers} deleteBooking={deleteBooking} refreshBooking={refreshBooking}></MyTransfers>

            </>
        }>

        </Card>

        <Card Content={
            <div className={"availableEstatesContainer"}>
                Available Pickup Locations:
                <br/>
                {
                    bookings.map((booking, index) => {
                        return <Card initState={true} key={index} title={booking.name} Content={
                            <EntrySelection refreshTransfers={refreshBooking} addBooking={addBooking} style={style}
                                            bookingInfo={booking}></EntrySelection>
                        }></Card>
                    })
                }
            </div>

        }>

        </Card>

    </div>
}

function MyTransfers({
                         estates,
                         confirmTransfer,
                         updateTransfer,
                         transfers,
                         setTransfers,
                         deleteBooking,
                         refreshBooking,
                         dropoffs,
                         setDropoffs,
                         refreshDropoffs
                     }) {
    // console.log(transfers)
    // console.log(estates)
    return <div className={"myDropoffs"}>
        My Dropoffs:{
        transfers.map((transfer, index) => {
            return <Card key={index} Content={

                <TransferView estates={estates} confirmTransfer={confirmTransfer} updateTransfer={updateTransfer}
                              dropoffs={dropoffs} setDropoffs={setDropoffs} refreshDropoffs={refreshDropoffs}
                              transferInfo={transfer} key={index} deleteTransfer={deleteBooking} refreshTransfers={refreshBooking}></TransferView>
            }></Card>

        })
    }
    </div>
}

function TransferView({estates, confirmTransfer, updateTransfer, transferInfo, deleteTransfer, refreshTransfers, dropoffs, setDropoffs, refreshDropoffs}) {
    // console.log(transferInfo)
    let thisDropoff = dropoffs.filter((d) => {return d.dropoffID === transferInfo.dropoffID})[0]
    let thisEstate = estates.filter((d) => {return d.estateID === transferInfo.estateID})[0]
    console.log(thisDropoff)
    if (transferInfo.dropoffID == -1 || thisDropoff === undefined || thisEstate === undefined) {
        return <div className={"transferView"}>
            {/*<LocationView location={transfer}></LocationView>*/}

            {transferInfo.window}
            <button onClick={() => {
                deleteTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
            }}>Delete
            </button>
            <Collapsible title={"Select dropoff"}
                         Content={<DropoffSelection refreshTransfers={refreshTransfers} transferInfo={transferInfo}
                                                    updateTransfer={updateTransfer} dropoffs={dropoffs}
                                                    setDropoffs={setDropoffs}
                                                    refreshDropoffs={refreshDropoffs}></DropoffSelection>}></Collapsible>
            <br/>
            Pick up at:
            {
                (thisEstate !== undefined) ? <div className={"soloDropoffLocationView"}>
                    <LocationView location={thisEstate.location}></LocationView>
                </div> : <div></div>
            }

        </div>
    }


    // console.log(transferInfo)
    // console.log(thisDropoff)
    return <div className={"transferView"}>
        <button onClick={() => {
            deleteTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
        }}>Delete</button>
        <button onClick={
            () => {
                confirmTransfer(transferInfo.transferID).onreadystatechange = refreshTransfers
            }
        }>Confirm</button>

        <div className={"dropoffLocationContainer"}>
            {/*Drop off at:*/}
            <div style={
                {gridColumn: 1}
            } className={"dropoffLocationView"}>
                <LocationView location={thisDropoff.location}></LocationView>
            </div>

            <div style={
                {gridColumn: 2}
            } className={"dropoffLocationView"}>
                {/*Pick up at:*/}
                <LocationView location={thisEstate.location || "0,0"}></LocationView>
            </div>

            <div>
                Drop off at <br/>
                {transferInfo.dropoffWindow}
            </div>

            <div>
                Pick up at <br/>
                {transferInfo.window}

            </div>
        </div>


        {/*{thisDropoff.location}*/}
        <br/>
        Confirmed: {transferInfo.isConfirmed}
    </div>
}

function EntrySelection({refreshTransfers, bookingInfo, addBooking}) {
    // console.log(bookingInfo)
    return <div className={"dropoffEntrySelection"}>
        Name: {bookingInfo.name}
        <br/>
        <div className={"dropoffLocationView"}> <LocationView location={bookingInfo.location}></LocationView> </div>

        {/*{bookingInfo.location}*/}
        <br/>
        Availability: <Collapsible style={{display: "inline"}} title={""} Content={bookingInfo.availability.split(",").map((window, index) => {
        return (
            <WindowSelection refreshTransfers={refreshTransfers} bookingInfo={bookingInfo} addBooking={addBooking} key={index} info={window}></WindowSelection>
        )
    })}></Collapsible>
    </div>
}

function WindowSelection({refreshTransfers, info, addBooking, bookingInfo}) {
    if (info.length < 10) {
        return <></>
    }

    return <div>{info} <button onClick={() => {
        let a = addBooking(info, bookingInfo.estateID, -1)
        if (a !== undefined) {
            a.onreadystatechange = refreshTransfers
        }

        // console.log("Booking: ", info)
    }}> Book </button></div>
}

function DropoffSelection({dropoffs, setDropoffs, refreshDropoffs, updateTransfer, transferInfo, refreshTransfers}) {
    // console.log(dropoffs)
    return <div>
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
    // console.log(dropoffInfo)
    return <div>
        Name: {dropoffInfo.name}
        <br/>
        Availability:

        {/*using the window selection for this is very hacky
           we will need to replace these anonymous functions that do nothing
        */}
        <Collapsible style={{display: "inline"}} title={""} Content={dropoffInfo.availability.split(",").map((window, index) => {
        return (
            <WindowSelection refreshTransfers={() => {}} bookingInfo={dropoffInfo} addBooking={(e) => {
                updateTransfer(transferInfo.window, transferInfo.transferID, dropoffInfo.dropoffID, transferInfo.estateID, window).onreadystatechange= refreshTransfers
            }} key={index} info={window}></WindowSelection>
        )
    })}></Collapsible>
    </div>
}