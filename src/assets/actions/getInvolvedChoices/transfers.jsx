import {useContext, useEffect, useRef, useState} from "react";
import {BookingsMenu} from "../../components/bookingMenu.jsx";
import {BookingSelection} from "../../components/bookingSelection.jsx";
import {PopupContext} from "../../app.jsx";
import {Card} from "../../components/card.jsx";

export function TransferBookings ({StateHook, goBack}) {

    const [popupState, popupHook, notifState, notifHook] = useContext(PopupContext)
    const addNotif = (msg) => {
        let l = notifState.slice() //change does not trigger update without this lmfao
        l.push([msg, Date.now()+1500])
        // console.log(l)
        notifHook(l)
        // console.log(notifState)
    }
    const [pickups, setPickups] = useState(null)
    const [appointments, setAppointments] = useState(null)

    const getAppointments = () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                // console.log(req.response)
                setAppointments(req.response)
            }
        }
        req.open("GET", "api/getAppointments", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}));
        return req
    }

    const getPickups = () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {

            if (req.readyState === 4) {
                // console.log(req.response)
                setPickups(JSON.parse(req.response))
            }
        }
        req.open("POST", "api/getAllAvailability", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}));
        return req
    }


    useEffect(() => {
        getPickups()
        getAppointments()
    }, [])



    return <div className={"pickupContainer"}>
        <Card animated={false} Content={
            <div className={"pickupCaption"}>
                Looking for a fun fall activity that allows you to volunteer and put your time to good use in the process? Forego the commercial orchards and sign up to pick fruit at a private home. We’ll provide the possible locations and even the bags for picking, and you enjoy the activity and deliver to one of our available food shelters once you’re done.
            </div>
        }></Card>


        <WeekView appointments={appointments} getAppointments={getAppointments} pickups={pickups} getPickups={getPickups}></WeekView>

        {/*<Card animated={false} Content={*/}
        {/*    // <div>*/}
        {/*}></Card>*/}
    </div>
}

function WeekView ({getPickups, pickups, appointments, getAppointments}) {
    let nextDay = (day, n) => {
        let d = new Date(day)
        d.setDate(d.getDate() + n);
        return d
    }
    const StartDate = useRef(nextDay(Date.now(), 0-(new Date(Date.now())).getDay() ))
    let ds = [StartDate.current]
    for (let i = 1; i < 7; i++) {
        ds.push(nextDay(StartDate.current, i))
    }
    const [days, setDays] = useState(ds)
    const [selectedDay, setSelectedDay] = useState(-1)
    // console.log(typeof pickups)
    // console.log(pickups)
    let [p,p2,e, a] = [[], [], [], []]
    if (pickups != null && appointments != null) {
        a = new Array(JSON.parse(appointments).rows)[0]
        // console.log(a)
        a = [...new Set(a.map(ap => ap.windowID))];
        // console.log(a)
        p = new Array(pickups.pickups)[0]
        // console.log(p)
        p2 = []
        e = pickups.estates;
        for (let i = 0; i < p.length; i++) {
            // console.log(i)
            if (((selectedDay > -1) && (p[i]['date']) === (days[selectedDay].toDateString()) )&& (a.indexOf(p[i].windowID) < 0) ) {
                p2.push(p[i])
                console.log(p[i].windowID, a, a.indexOf(p[i].windowID))
            }
        }
        // console.log(p2, e)
    }

    const getEstate = (estateID) => {
        return e[estateID]
    }

    const backAvailable = nextDay(StartDate.current, -1) >= new Date(Date.now())
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return <div>
        <Card animated={false} Content={
            <div className={"WeekView"}>
                <div className={"WeekViewMonth"}>{months[StartDate.current.getMonth()] + " " + StartDate.current.getFullYear()}</div>
                <div className={"WeekViewCols"}>
                    {backAvailable ? <button onClick={() => {
                        let ds = [nextDay(StartDate.current, -7)]
                        for (let i = 1; i < 7; i++) {
                            ds.push(nextDay(ds[0], i))
                        }
                        StartDate.current = ds[0]
                        setDays(ds)
                    }}>{"<"}</button> : <button disabled>{"<"}</button>}
                    {
                        days.map((d, i) => {
                            return <DayView selectedDay={selectedDay} setSelectedDay={setSelectedDay} index={i} key={i}
                                            d={d}></DayView>
                        })
                    }
                    <button onClick={() => {
                        let ds = [nextDay(StartDate.current, +7)]
                        for (let i = 1; i < 7; i++) {
                            ds.push(nextDay(ds[0], i))
                        }
                        StartDate.current = ds[0]
                        setDays(ds)
                    }}>{">"}</button>

                </div>
            </div>
        }></Card>
        <Card animated={false} Content={
            <div className={"WeekView"}>
                {(selectedDay == -1) ? <div className={"pickupViewMsg"}>{"Select a day to view available pickups"}</div> : (p2.length == 0) ? <div className={"pickupViewMsg"}>{"No pickups on this day"}</div> : <div className={"pickupViewContainer"}>
                    {p2.map((d, i) => {
                        // return <div key={i}>{d.date}</div>
                        return <PickupView getAppointments={getAppointments} getPickups={getPickups} getEstate={getEstate} key={i} PickupInfo={d}></PickupView>
                    })}
                </div>}
            </div>
        }></Card>
    </div>
}

function PickupView ({PickupInfo, getEstate, getPickups, getAppointments}) {
    let estate = getEstate(PickupInfo.estateID)[0];

    const bookAppointment = (estateID, windowID) => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let response = JSON.parse(req.response);
            }
        }

        req.open("POST", "api/bookAppointment", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({estateID, windowID}));
        return req;
    }
    let estateID = PickupInfo.estateID
    let windowID = PickupInfo.windowID;

    console.log(estate, estate['approxLocation'])
    return <div className={"pickupView"}>
        <div className={"pickupViewTime"}>{PickupInfo.timeStart} - {PickupInfo.timeEnd}</div>
        <div className={"pickupViewLocation"}>{estate.approxLocation}</div>
        <div className={"pickupViewMsg"}>{"Confirmed volunteers: " + PickupInfo.bookedBy}   </div>
        <button onClick={() => {
            bookAppointment(estateID, windowID).onreadystatechange = () => {
                getPickups().onreadystatechange = getAppointments
            }
        }}>Request</button>
    </div>
}

function DayView({d, selectedDay, setSelectedDay, index}) {
    let isUnselectable = d < new Date(Date.now())
    return <div onClick={() => {
        if (!isUnselectable) {
            setSelectedDay(index)
        }
    }} className={(isUnselectable) ? "pickupDayContainer unselectable" : (selectedDay == index) ? "pickupDayContainer selectedDay" : "pickupDayContainer"}>
        <div className={"pickupDayOfWeek"}>{d.toDateString().slice(0, 4)}</div>
        <div className={"pickupDayOfMonth"}>{d.getDate()}</div>
    </div>
}