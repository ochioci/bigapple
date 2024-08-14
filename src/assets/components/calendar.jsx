import {useReducer, useRef, useState} from "react";

export function Calendar({selected}) {
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





    return <>
        <div style={style}>

            {Object.keys(datesByDayOfWeek).map(day => {
                {
                    return <CalendarColumn selected={selected}  key={day}
                                           dates={datesByDayOfWeek[day]}></CalendarColumn>
                }
            })}
        </div>
        <button onClick={() => {
            selected.current = []
        }}>Reset</button>
    </>

}

function CalendarColumn({dates, selected}) {
    const style = {
        borderLeft: "1px solid grey",
        borderRight: "1px solid grey",
        padding: "3px"
    }
    return <div style={style}>
        {dates[0].toDateString().slice(0, 3)}
        {dates.map(d => {
            return <CalendarCell selected={selected} key={d.toDateString()} key2={d.toDateString()} date={d}></CalendarCell>
        })}
    </div>
}

function CalendarCell({date, key2, selected}) {

    const [isSelected, setSelected] = useState(false)

    let d  = new Date(Date.now())
    let style = {color: "black", backgroundColor: "white", cursor: "pointer"}
    if (date.getTime() < d.getTime()) {
        style.color = "grey"
    }
    if (isSelected) {
        style.backgroundColor = "blue"
        style.color = "white"
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

    return <div onClick={toggleSelect} style={style}>{date.toDateString().slice(3, date.toDateString().length-4)}</div>
}