import {useReducer, useState} from "react";

export function Calendar({inputHook}) {
    let datesByDayOfWeek = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]}
    let cd = new Date(Date.now())
    cd.setDate(cd.getDate()-cd.getDay())
    let dates = []
    const [sd, sdHook] = useState([]);
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


    function reset() {
        sdHook([])
        inputHook([])
    }



    return <>
        <div style={style}>

            {Object.keys(datesByDayOfWeek).map(day => {
                {
                    return <CalendarColumn inputHook={inputHook} sd={sd} sdHook={sdHook} key={day}
                                           dates={datesByDayOfWeek[day]}></CalendarColumn>
                }
            })}
        </div>
        <button onClick={reset}>Reset</button>
    </>

}

function CalendarColumn({dates, sd, sdHook, inputHook}) {
    const style = {
        borderLeft: "1px solid grey",
        borderRight: "1px solid grey",
        padding: "3px"
    }
    return <div style={style}>
        {dates[0].toDateString().slice(0, 3)}
        {dates.map(d => {
            return <CalendarCell inputHook={inputHook} sd={sd} sdHook={sdHook} key={d.toDateString()} key2={d.toDateString()} date={d}></CalendarCell>
        })}
    </div>
}

function CalendarCell({date, sd, sdHook, key2, inputHook}) {
    const [, forceUpdate] = useReducer(x => x + 1, 0); //do not fuck with this
    let d  = new Date(Date.now())
    let style = {color: "black", backgroundColor: "white", cursor: "pointer"}
    if (date.getTime() < d.getTime()) {
        style.color = "grey"
    }


    function selectThis() {
        inputHook(sd)
        setTimeout(() => {inputHook(sd)}, 100);
        if (date.getTime() > d.getTime() && sd.indexOf(key2) === -1) {
            // style.backgroundColor = "blue"
            let a = sd
            a.push(key2)
            inputHook(a)
            sdHook(a)


        } else if (sd.indexOf(key2) > -1) {
            let a = sd
            a = a.filter(item => {
                return item !== key2
            })
            inputHook(a)
            sdHook(a)

        }
        forceUpdate()
        //THIS IS REALLY IMPORTANT. COMPONENT DOES NOT RERENDER ON CLICK IF U DONT DO THIS

    }
    let isSelected = (sd.indexOf(key2) > -1);
    if (isSelected) {
        let style = {
            backgroundColor: "blue",
            color: "white",
            cursor: "pointer"
        }
        return <div onClick={selectThis} style={style}>{date.toDateString().slice(3, date.toDateString().length-4)}</div>
    }
    return <div onClick={selectThis} style={style}>{date.toDateString().slice(3, date.toDateString().length-4)}</div>
}