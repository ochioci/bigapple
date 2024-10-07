import {Card} from "../../components/card.jsx";
import {useEffect, useState} from "react";

export function AdminView() {
    const [users, setUsers] = useState(null);
    const [estates, setEstates] = useState(null);
    const [appointments, setAppointments] = useState(null);
    useEffect( () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                setUsers(JSON.parse(req.response).rows)
            }
        }
        req.open("POST", "api/getAllUsers", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}))
    }, [])
    useEffect( () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                setEstates(JSON.parse(req.response).rows)
            }
        }
        req.open("POST", "api/getAllEstates", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}))
    }, [])
    useEffect( () => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                setAppointments(JSON.parse(req.response))
            }
        }
        req.open("POST", "api/getAllAppointments", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({}))
    }, [])


    return <div className={"AdminView"}>
        <Card animated={false} Content={
            "Admin dashboard"
        }></Card>
        <Card animated={false} Content={
            <EstateAdminView estates={estates} users={users}></EstateAdminView>
        }></Card>
        <Card animated={false} Content={
            <AppointmentAdminView users={users} info={appointments} estates={estates}></AppointmentAdminView>
        }></Card>
    </div>
}

function EstateAdminView({estates, users}) {
    // console.log(estates)
    return <div className={"EstateAdminView"}>
        {(estates == null) ? <div>{"Loading"}</div> : estates.map((e, index) => {
                return <EstateAdminEntry info={e} key={index}
                     owner = {
                        users.filter((u) => {
                            return u.userID == e.ownerID
                        })[0]
                     }
                ></EstateAdminEntry>
            })}
    </div>
}

function EstateAdminEntry({info, owner}) {
    return <div className={"EstateAdminEntry"}>
        <div>{"Property Name: " + info.name}</div>
        <div>{"Location: " + info.location}</div>
        <div>{"Owner name: " + owner.firstname + " " + owner.lastname}</div>
        <div>{"Owner email: " + owner.email}</div>
        <div>{"Owner phone: " + owner.phoneNumber}</div>
    </div>
}

function AppointmentAdminView({info, estates, users}) {
    console.log(info, estates, users)
    return <div className={"AppointmentAdminView"}>
        {(info == null || estates == null || users == null) ? <div>{"Loading"}</div> : info.apts.map((a, index) => {
            return <AppointmentAdminEntry
                users={users}
                estate={
                    estates.filter((e) => {
                        return e.estateID == a.estateID
                    })[0]
            } info={a} window={info.windows.filter((b) => {
                return b.windowID == a.windowID
            })[0]} key={index}></AppointmentAdminEntry>
        })}
    </div>
}

function AppointmentAdminEntry({info, window, estate, users}) {
    // console.log(info, window, estate)
    const booker = users.filter((u) => {
        return u.userID == info.userID
    })[0]
    const owner = users.filter((u) => {
        return u.userID == estate.ownerID
    })[0]
    // console.log(booker, owner)
    return <div className={"AppointmentAdminEntry"}>
        <div>{"Date: " + window.date}</div>
        <div>{"Start Time: " + window.timeStart}</div>
        <div>{"End time: " + window.timeEnd}</div>
        <div>{"Status: " + info.status}</div>
        <div>{"Location: " + estate.location}</div>
        <div>{"Property owner name: " + owner.firstname + " " + owner.lastname}</div>
        <div>{"Volunteer name: " + booker.firstname + " " + booker.lastname}</div>
    </div>
}