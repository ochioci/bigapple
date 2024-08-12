export function HomepageContent () {
    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "20% 60% 40%",
        gridTemplateColumns: "1fr"
    }
    return <div style={style}>
        <Title gridRow={2}></Title>
    </div>
}



function Title ({gridRow}) {
    const style = {
        fontSize: "30pt",
        display: "flex",
        gridRow: gridRow,
        justifyContent: "center",
        alignItems: "center"
    }
    return <div style={style}>The Great Big Apple</div>
}