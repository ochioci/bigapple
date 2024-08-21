export function Card ({Content, onClick=(()=>{}), animated=true, whitebg=false}) {

    let cn = animated ? "card c" : "cardNoAnimate c"
    let style = whitebg ? {backgroundColor: "rgba(137, 255, 160, 1)"} : {}
    return <div style={style} className={cn} onClick={onClick} > {Content}</div>
}