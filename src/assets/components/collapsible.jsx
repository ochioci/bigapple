import {useState} from "react";

export function Collapsible ({Content, title}) {
    const [isOpen, setOpen] = useState(false)

    function toggle () {
        setOpen(!isOpen)
    }

    if (isOpen) {
        console.log(Content)
        return <div>
            <button onClick={toggle}>{title + " v"}</button>
            {Content}
        </div>
    } else {
        return <button onClick={toggle}>{title + " >"}</button>
    }
}