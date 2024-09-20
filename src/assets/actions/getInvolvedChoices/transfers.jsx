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
    }, [])



    return <div className={"pickupContainer"}>
        <Card animated={false} Content={
            <div className={"pickupCaption"}>
                Looking for a fun fall activity that allows you to volunteer and put your time to good use in the process? Forego the commercial orchards and sign up to pick fruit at a private home. We’ll provide the possible locations and even the bags for picking, and you enjoy the activity and deliver to one of our available food shelters once you’re done.
            </div>
        }></Card>


        <WeekView pickups={pickups} getPickups={getPickups}></WeekView>

        {/*<Card animated={false} Content={*/}
        {/*    // <div>*/}
        {/*}></Card>*/}
    </div>
}

function WeekView ({getPickups, pickups}) {
    let nextDay = (day, n) => {
        let d = new Date(day)
        d.setDate(d.getDate() + n);
        return d
    }
    const StartDate = useRef(new Date(Date.now()))
    let ds = [StartDate.current]
    for (let i = 1; i < 7; i++) {
        ds.push(nextDay(StartDate.current, i))
    }
    const [days, setDays] = useState(ds)
    const [selectedDay, setSelectedDay] = useState(-1)
    // console.log(typeof pickups)
    // console.log(pickups)
    let [p,p2,e] = [[], [], []]
    if (pickups != null) {
        p = new Array(pickups.pickups)[0]
        // console.log(p)
        p2 = []
        e = pickups.estates;
        for (let i = 0; i < p.length; i++) {
            // console.log(i)
            if ((selectedDay > -1) && (p[i]['date']) === (days[selectedDay].toDateString())) {
                p2.push(p[i])
            }
        }
        // console.log(p2, e)
    }

    let backAvailable = nextDay(StartDate.current, -1) >= new Date(Date.now())

    return <div>
        <Card animated={false} Content={
            <div className={"WeekView"}>
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
                {(selectedDay == -1) ? "Select a day to view available pickups" : (p2.length == 0) ? "No pickups on this day" : <div>
                    {p2.map((d, i) => {
                        return <div key={i}>{d.date}</div>
                    })}
                </div>}
            </div>
        }></Card>
    </div>
}

function DayView({d, selectedDay, setSelectedDay, index}) {
    return <div onClick={() => {
        setSelectedDay(index)
    }} className={(selectedDay == index) ? "pickupDayContainer selectedDay" : "pickupDayContainer"}>
        <div className={"pickupDayOfWeek"}>{d.toDateString().slice(0, 4)}</div>
        <div className={"pickupDayOfMonth"}>{d.getDate()}</div>
    </div>
}