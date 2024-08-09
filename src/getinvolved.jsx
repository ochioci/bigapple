export function GetInvolvedContent () {

    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        gridTemplateColumns: "1fr"
    }

    return <div style={style}>
        <GetInvolvedChoices></GetInvolvedChoices>
    </div>
}

function GetInvolvedChoices() {
    const style = {
        display: "flex",
        gridRow: "1",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    }
    return <div style={style}>
    <button>I have fruit trees on my property</button>
    <button>I wish to volunteer to pick fruit</button>
    <button>I wish to receive fruits</button>
        </div>
}