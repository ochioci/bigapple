export function Card ({Content, onClick=(()=>{}), animated=true}) {

    let cn = animated ? "card c" : "cardNoAnimate c"
    return <div className={cn} onClick={onClick} > {Content}</div>
}