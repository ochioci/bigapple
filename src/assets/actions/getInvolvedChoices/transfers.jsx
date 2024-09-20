import {useContext, useEffect, useState} from "react";
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
    const [pickups, setPickups] = useState([])

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



    return <div className={"pickupContainer"}>
        <Card animated={false} Content={
            <div className={"pickupCaption"}>
                Looking for a fun fall activity that allows you to volunteer and put your time to good use in the process? Forego the commercial orchards and sign up to pick fruit at a private home. We’ll provide the possible locations and even the bags for picking, and you enjoy the activity and deliver to one of our available food shelters once you’re done.
            </div>
        }></Card>

        <Card animated={false} Content={
            <div className={"pickupContainer"}>
                <WeekView pickups={pickups} getPickups={getPickups}></WeekView>
            </div>
        }></Card>
        {/*<Card animated={false} Content={*/}
        {/*    // <div>*/}
        {/*}></Card>*/}
    </div>
}

function WeekView ({StartDate = new Date(Date.now()), getPickups, pickups}) {
    let ds = [StartDate]
    let nextDay = (day, n) => {
        let d = new Date(day)
        d.setDate(d.getDate() + n);
        return d
    }
    for (let i = 1; i < 7; i++) {
        ds.push(nextDay(StartDate, i))
    }
    const [days, setDays] = useState(ds)
    useEffect(() => {
        getPickups()
    }, [])
    console.log(pickups)
    return <div className={"WeekView"}>
        <div className={"WeekViewCols"}>
            {
                days.map((d, i) => {
                    return <DayView key={i} d={d}></DayView>
                })
            }
        </div>
    </div>
}

function DayView({d}) {
    return <div className={"pickupDayContainer"}>
        <div className={"pickupDayOfWeek"}>{d.toDateString().slice(0,4)}</div>
        <div className={"pickupDayOfMonth"}>{d.getDate()}</div>
    </div>
}