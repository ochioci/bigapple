import {useReducer, useRef, useState} from "react";
import {Card} from "./card.jsx";

export function Calendar({selected, include=<></>}) {
    let datesByDayOfWeek = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]}
    let cd = new Date(Date.now())
    cd.setDate(cd.getDate()-cd.getDay())
    let dates = []
    for (let i = 0; i < 35; i++) {
        let t = new Date();
        t.setDate(cd.getDate() + (i));
        datesByDayOfWeek[t.getDay()].push(t)
        dates.push(t)
    }
    // console.log(dates)
    const style = {
        display: "flex"
    }





    return <Card Content={
        <div className={"calendarContainer"}>
            {include}

            <button onClick={() => {
                selected.current = []
            }}>Clear
            </button>
            <div className={"calendar"} style={style}>
                {Object.keys(datesByDayOfWeek).map(day => {
                    {
                        return <CalendarColumn selected={selected} key={day}
                                               dates={datesByDayOfWeek[day]}></CalendarColumn>
                    }
                })}
            </div>

        </div>
    }>


    </Card>

}

function CalendarColumn({dates, selected}) {
    const style = {
        borderLeft: "1px solid grey",
        borderRight: "1px solid grey",
        padding: "3px"
    }
    return <div style={style} className={"calendarColumn"}>
        <div className={"dayOfWeek"}>{dates[0].toDateString().slice(0, 3)}</div>
        {dates.map(d => {
            return <CalendarCell selected={selected} key={d.toDateString()} key2={d.toDateString()} date={d}></CalendarCell>
        })}
    </div>
}

function CalendarCell({date, key2, selected}) {

    const [isSelected, setSelected] = useState(false)
    let cn = "calendarCell"
    let d  = new Date(Date.now())
    // let style = {color: "black", backgroundColor: "white", cursor: "pointer"}
    if (date.getTime() < d.getTime()) {
        cn += " ccInactive"
    }
    if (isSelected) {
        cn += " ccSelected"
    }

    const toggleSelect = () => {
        if (isSelected) {
            selected.current = selected.current.filter((item) => {
                return (item !== key2)
            })

        } else {
            selected.current.push(key2)
        }
        setSelected(!isSelected)
    }

    return <div className={cn} onClick={toggleSelect}>{date.toDateString().slice(3, date.toDateString().length-4)}</div>
}