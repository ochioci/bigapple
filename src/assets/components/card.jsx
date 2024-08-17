export function Card ({Content}) {
    const style = {
        border: "1vw solid #729C9E",
        borderRadius: "1vw",
        padding: "2vw",
        display: "flex",
        overflow: "hidden",
        margin: "1vw",
        backgroundColor: "#DAE6EB",
        color: "#0d2c38"
    }
    return <div style={style}> {Content}</div>
}