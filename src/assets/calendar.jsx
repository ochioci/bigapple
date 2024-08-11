export function Calendar() {
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
    console.log(datesByDayOfWeek);
    const style = {
        display: "flex"
    }
    return <div style={style}>
        {Object.keys(datesByDayOfWeek).map(day => {
            {
                return <CalendarColumn key={day} dates={datesByDayOfWeek[day]}></CalendarColumn>
            }
        })}
    </div>

}

function CalendarColumn({dates}) {
    return <div>
        {dates.map(d => {
            return <CalendarCell key={d.toDateString()} date={d}></CalendarCell>
        })}
    </div>
}

function CalendarCell({date}) {
    return <div>{date.toDateString().slice(0, date.toDateString().length-4)}</div>
}