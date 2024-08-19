import {Card} from "../components/card.jsx";

export function AboutUsContent() {
    const style = {
        fontSize: "15pt",
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // padding: "10%",
        height: "100%",
        padding: "4vh",
        overflow: "none",
        flexDirection: "column",
        paddingTop: "10vh"
    }
    return <div style={style}>
        <Card animated={false} style={style} Content={
            <AboutUs></AboutUs>
        }></Card>

    </div>
}
function AboutUs() {
    const style = {
        fontFamily: "JustSansBold",
        fontSize: "20pt",

    }

    const style2 = {
        fontFamily: "JustSansRegular",
        fontSize: "14pt",
        marginTop: "1vh"
    }
    return <div style={style}>
        Mission Statement
        <div style={style2}>
            At The Big Wild Apple, our mission is to bridge the gap between abundance and need by connecting generous homeowners with volunteer apple pickers. We harness the surplus of fresh fruit from private gardens and channel it directly to local food shelters, ensuring that every apple contributes to nourishing our community. Through collaboration, compassion, and sustainability, we strive to reduce food waste and provide healthy, fresh produce to those in need throughout the New York City area
        </div>
    </div>
}