export function ContactContent() {
    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        gridTemplateColumns: "1fr"
    }

    return <div style={style}><form action="/contactAPI" method="POST">
        <label>Send us a message</label>
        <input type={"text"}/>
        <label>Email address</label>
        <input type={"text"}/>
        <button type="submit">Send</button>
    </form></div>
}