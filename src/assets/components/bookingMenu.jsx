import {useEffect, useRef, useState} from "react";
import {Calendar} from "./calendar.jsx";
import {Collapsible} from "./collapsible.jsx";
import {LocationSelection} from "./map.jsx";
import {Card} from "./card.jsx";


export function BookingsMenu({StateHook, title, id, refresh, updateBooking, addBooking, deleteBooking, bookings, setBookings}) {

    useEffect(() => {refresh()}, [])
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw",
    }



    return <div style={{marginTop: "10vh"}}>
        <Card Content={
            <div style={style}>
                <Collapsible initState={true} Content={<>
                    <AddBooking title={title} id={id} bookings={bookings} setBookings={setBookings} refresh={refresh}
                                doAdd={addBooking}></AddBooking>
                </>} title={"Add " + title}>

                </Collapsible>
                <br/>
                <button onClick={refresh}>Refresh</button>

                {bookings.map((item) => {
                    return <Collapsible initState={true} key={item[id]} title={item.name + " " + title} Content={
                        <BookingView title={title} id={id} key={item[id]} doDelete={deleteBooking} bookingInfo={item}
                                     setBookings={setBookings}
                                     refresh={refresh}
                                     doUpdate={updateBooking}></BookingView>
                    }></Collapsible>
                })}


            </div>
        }></Card>
    </div>


}

export function AddBooking({bookings, setBookings, refresh, doAdd, id, title}) {
    const dates = useRef([])
    const name = useRef("")
    const startTime = useRef("08:00")
    const endTime = useRef("20:00")
    const style = {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw"
    }
    const [selectedPlace, setSelectedPlace] = useState(null)
    return <div style={style}>
        <Calendar selected={dates}></Calendar>
        <input type={"text"} placeholder={"name"} onChange={(e) => (name.current = e.target.value)}/>
        {/*<input type={"text"} placeholder={"location"} onChange={(e) => (location.current = e.target.value)}/>*/}
        <input type={"time"} defaultValue={"08:00"} onChange={e => (startTime.current = e.target.value)}/>
        <input type={"time"} defaultValue={"20:00"} onChange={e => (endTime.current = e.target.value)}/>
        <LocationSelection selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}></LocationSelection>
        <button onClick={() => {
            doAdd(name.current, (selectedPlace !== null) ? (
                selectedPlace.geometry.location.lat() + "," + selectedPlace.geometry.location.lng()
            ) : "0,0", dates.current.map((d) => {return d + "(" + startTime.current + "-" + endTime.current + ")"})).onreadystatechange = refresh
        }}>Add days</button>
    </div>
}


function BookingView({bookings, setBookings, bookingInfo, refresh, doUpdate, doDelete, id, title}) {
    // console.log(bookingInfo)
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw",
        // marginTop: "15vh",
    }
    let [dates, datesHook] = useState(bookingInfo.availability.split(",").map((d, index) => {return [d, index]}))
    const datesToAdd = useRef([])
    const startTime = useRef("08:00");
    const endTime = useRef("20:00");
    return <div style={style}>
        <div>Name: {bookingInfo.name}</div>
        <div>Location: {bookingInfo.location}</div>
        <div>ID: {bookingInfo[id]}</div>
        <Collapsible onClick={refresh} title={"Availability"} Content={
            dates.map((date) => {
                return <div key={Math.random()}><DateView id={id} key={date[1]} bookings={bookings} bookingInfo={bookingInfo} setBookings={setBookings} datesList={dates} datesHook={datesHook} refresh={refresh} doUpdate={doUpdate} date={date[0]} lookupKey={date[1]}></DateView>
                </div>
            })}>

        </Collapsible>
        <Collapsible  title={"Add dates"} Content={<>
            <Calendar selected={datesToAdd}></Calendar>
            <button onClick={
                () => {
                    let av = dates.map((item) => {return item[0]}).concat(datesToAdd.current.map((item) => {
                        return item + "(" + startTime.current + "-" + endTime.current + ")"
                    }))
                    let av2 = av.map((d, index) => {return [d, index]})
                    console.log(av)
                    console.log(av2)
                    doUpdate(bookingInfo.name, bookingInfo.location, av.join(","), bookingInfo[id])
                    datesHook(av2)
                }
            }>Submit</button>
            <input type={"time"} defaultValue={"08:00"} onChange={e => (startTime.current = e.target.value)}/>
            <input type={"time"} defaultValue={"20:00"} onChange={e => (endTime.current = e.target.value)}/>
        </>}></Collapsible>
        <button onClick={() => {
            doDelete(bookingInfo[id]).onreadystatechange = refresh
        }}>Delete</button>
    </div>
}

function DateView({bookings, setBookings, bookingInfo, datesList, refresh, doUpdate, date, lookupKey, datesHook, id}) {
    const style= {
        border: "0.5vw solid black",
        borderRadius: "0.25vw",
        padding: "1vw",
        margin: "1vw"
    }

    let p = date.indexOf("(")
    const day = useRef(date.slice(0, p) || "")
    const startTime = useRef(date.slice(p+1, p+6) || "")
    const endTime = useRef(date.slice(p+7, p+12) || "")
    if ((day.current.length == 0) || (startTime.current.length < 5) || (endTime.current.length < 5) || datesList.length==0) {
        return <div style={{display: "None"}}></div>
    }
    return <div style={style}>
        <input type={"date"} defaultValue={new Date(day.current).toLocaleDateString("en-CA")}/>
        <input type={"time"} defaultValue={startTime.current} onChange={(e) => {
            startTime.current = e.target.value
        }}/>
        <input type={"time"} defaultValue={endTime.current} onChange={(e) => {
            endTime.current = e.target.value
        }}/>
        <button onClick={() => {
            if ((day.current.length == 0) || (startTime.current.length < 5) || (endTime.current.length < 5)) {
                return
            }
            let temp = datesList.filter((item) => {
                return item[1] !== lookupKey
            })
            temp.push([day.current + "(" + startTime.current + "-" + endTime.current + ")", Math.random()])
            // console.log(temp)
            doUpdate(bookingInfo.name, bookingInfo.location, temp.map((item) => {
                return item[0]
            }).join(","), bookingInfo[id]).onreadystatechange = refresh //this shit is genius
            datesHook(temp)
        }}>Update
        </button>
        <button onClick={() => {
            if ((day.current.length == 0) || (startTime.current.length < 5) || (endTime.current.length < 5)) {
                return
            }
            let temp = datesList.filter((item) => {
                return item[1] !== lookupKey
            })
            // console.log(temp)
            doUpdate(bookingInfo.name, bookingInfo.location, temp.map((item) => {
                return item[0]
            }).join(","), bookingInfo[id]).onreadystatechange = refresh
            datesHook(temp)
        }}>Delete
        </button>
    </div>

}