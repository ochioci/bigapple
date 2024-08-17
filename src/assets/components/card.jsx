export function Card ({Content, onClick=(()=>{})}) {
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
    return <div onClick={onClick} style={style}> {Content}</div>
}