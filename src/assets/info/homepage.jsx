import {Card} from "../components/card.jsx";

export function HomepageContent () {
    const style = {
        left: 0, right: 0, backgroundColor: null, margin: 0, padding: 0
    }
    return <><div style={style} className={"homepage"}>
        <Card Content={[<Heading key={1}></Heading>]}></Card>
    </div>
    <div className={"homepageBG"}></div></>

}


function Heading() {
    const style = {
        fontSize: "30pt",
        fontFamily: 'Geometos',

    }
    return <div style={style}>The Big Wild Apple
        <Tagline></Tagline>
    </div>
}

function Tagline() {
    const style = {
        fontSize: "15pt",
        fontFamily: "JustSansRegular",
        marginLeft: "0.5vw"
    }
    return <div style={style}>{"Pick. Share. Nourish."}</div>
}