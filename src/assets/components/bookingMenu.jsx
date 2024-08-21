import {useEffect, useRef, useState} from "react";
import {Calendar} from "./calendar.jsx";
import {Collapsible} from "./collapsible.jsx";
import {LocationSelection, LocationView} from "./map.jsx";
import {Card} from "./card.jsx";


export function BookingsMenu({helpText, StateHook, title, id, refresh, updateBooking, addBooking, deleteBooking, bookings, setBookings}) {

    useEffect(() => {refresh()}, [])
    const style= {
        padding: "1vw",
        margin: "1vw",
        minWidth: "min(100vh, 100vw)"
    }



    return <div style={{marginTop: "9vh"}}>

            <div style={style}>

                <Card  Content={<>
                    <AddBooking helpText={helpText} title={title} id={id} bookings={bookings} setBookings={setBookings} refresh={refresh}
                                doAdd={addBooking}></AddBooking>
                </>}>

                </Card>
                <br/>

                {bookings.map((item) => {
                    return <Card key={item[id]} Content={
                        <BookingView title={item.name + " " + title} id={id} key={item[id]} doDelete={deleteBooking} bookingInfo={item}
                                     setBookings={setBookings}
                                     refresh={refresh}
                                     doUpdate={updateBooking}></BookingView>
                    }></Card>
                })}


            </div>

    </div>


}

export function AddBooking({bookings, setBookings, refresh, doAdd, id, title, helpText="Use this menu to volunteer a property for fruit pickups"}) {
    const dates = useRef([])
    const name = useRef("")
    const startTime = useRef("08:00")
    const endTime = useRef("20:00")
    const style = {
        padding: "1vw",
        margin: "1vw"
    }
    const [selectedPlace, setSelectedPlace] = useState(null)
    return <div style={style}>
        <Card Content={
            <div className={"addEstate"}>
                <div style={{gridColumn: 1}}>
                    <div>Add {title}</div>
                    <div style={{fontSize: "min(2vw, 2vh)", fontFamily: "JustSansRegular"}}>
                        {helpText}
                    </div>
                </div>
                <div style={{gridColumn: 2}}>
                    <div>Name</div>
                    <input className={"bookingInput"} type={"text"} placeholder={"name"} onChange={(e) => (name.current = e.target.value)}/>
                </div>
                <div style={{gridColumn: 3}}>
                    <div>Hours</div>
                    <input className={"bookingInput"} type={"time"} defaultValue={"08:00"} onChange={e => (startTime.current = e.target.value)}/>
                    <input className={"bookingInput"} type={"time"} defaultValue={"20:00"} onChange={e => (endTime.current = e.target.value)}/>

                </div>

            </div>
        }>

        </Card>


        <Card Content={
            <>
                <LocationSelection selectedPlace={selectedPlace}
                                   setSelectedPlace={setSelectedPlace}></LocationSelection>
            </>
        }></Card>

        <Calendar selected={dates} include={
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                <div className={"calendarInclude"}>Select dates of availability</div>
                <button onClick={() => {
                    doAdd(name.current, (selectedPlace !== null) ? (
                        selectedPlace.geometry.location.lat() + "," + selectedPlace.geometry.location.lng()
                    ) : "0,0", dates.current.map((d) => {
                        return d + "(" + startTime.current + "-" + endTime.current + ")"
                    })).onreadystatechange = refresh
                }}>Finalize
                </button>

            </div>

        }></Calendar>

    </div>
}


function BookingView({bookings, setBookings, bookingInfo, refresh, doUpdate, doDelete, id, title}) {
    // console.log(bookingInfo)
    const style = {
    }
    let [dates, datesHook] = useState(bookingInfo.availability.split(",").map((d, index) => {
        return [d, index]
    }))
    const datesToAdd = useRef([])
    const startTime = useRef("08:00");
    const endTime = useRef("20:00");
    return <div className={"bookingView"} style={style}>
        <div className={"bookingViewTitle"}>{bookingInfo.name}</div>
        {/*<div>Location: {bookingInfo.location}</div>*/}
        <div className={"bookingLocationView"}>
            <LocationView location={bookingInfo.location}>

            </LocationView>
        </div>
        <div className={"bookingViewButtonContainer"}>
                <>

                <Card Content={
                    dates.map((date) => {
                        return <div key={Math.random()}><DateView id={id} key={date[1]} bookings={bookings}
                                                                  bookingInfo={bookingInfo} setBookings={setBookings}
                                                                  datesList={dates} datesHook={datesHook}
                                                                  refresh={refresh} doUpdate={doUpdate} date={date[0]}
                                                                  lookupKey={date[1]}></DateView>
                        </div>
                    })
                }>
                </Card>


                <Calendar selected={datesToAdd}></Calendar>
            <button onClick={
                () => {
                    let av = dates.map((item) => {
                        return item[0]
                    }).concat(datesToAdd.current.map((item) => {
                        return item + "(" + startTime.current + "-" + endTime.current + ")"
                    }))
                    let av2 = av.map((d, index) => {
                        return [d, index]
                    })
                    console.log(av)
                    console.log(av2)
                    doUpdate(bookingInfo.name, bookingInfo.location, av.join(","), bookingInfo[id])
                    datesHook(av2)
                }
            }>Add Days
            </button>
            <input className={"bookingInput"} type={"time"} defaultValue={"08:00"}
                   onChange={e => (startTime.current = e.target.value)}/>
            <input className={"bookingInput"} type={"time"} defaultValue={"20:00"}
                   onChange={e => (endTime.current = e.target.value)}/>
        </>



            <button onClick={() => {
                doDelete(bookingInfo[id]).onreadystatechange = refresh
            }}>Delete
            </button>
        </div>


    </div>
}

function DateView({bookings, setBookings, bookingInfo, datesList, refresh, doUpdate, date, lookupKey, datesHook, id}) {
    const style= {
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
        <input className={"bookingInput"} type={"date"} defaultValue={new Date(day.current).toLocaleDateString("en-CA")}/>
        <input className={"bookingInput"} type={"time"} defaultValue={startTime.current} onChange={(e) => {
            startTime.current = e.target.value
        }}/>
        <input className={"bookingInput"}  type={"time"} defaultValue={endTime.current} onChange={(e) => {
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