import {useState} from "react";

export function Collapsible ({onClick=(() => {}), Content, title, initState=false}) {
    const [isOpen, setOpen] = useState(initState)

    function toggle () {
        setOpen(!isOpen)
        if (isOpen) {
            onClick()
        }
    }
    const style = {
        display: "inline"
    }
    if (isOpen) {
        return <div style={style}>
            <button onClick={toggle}>{title + " v"}</button>
            {Content}
        </div>
    } else {
        return <button style={style} onClick={toggle}>{title + " >"}</button>
    }
}