import {Card} from "../components/card.jsx";

export function DonateContent() {
    const style = {
        fontSize: "15pt",
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // padding: "10%",
        height: "100%",
        padding: "4vh",
        overflow: "visible",
        flexDirection: "column",
        paddingTop: "0vh",
        paddingBottom: 0

    }
    return <div>
        <div style={style}>
            <Card animated={false} style={style} Content={
                <Shelter title={"Food Shelters"} content={"Once your bounty is picked, you can rest assured that the following food shelters (and many more!) are ready to accept them. \n"}></Shelter>
            }></Card>
            <Card animated={false} style={style} Content={
                <Shelter title={"CITY HARVEST"}
                         link={"https://www.cityharvest.org/"}
                         address={"150 52nd Street, Sunset Park, Brooklyn"}
                         info={"Accepting food donations 9am-5pm, Monday through Friday"}
                         contact={
                             <>
                                 <div>{"Contact the following email address to give them a heads up"}</div>
                                 <div>{"fooddonations@cityharvest.org"}</div>
                                 <div>{"SupplyChainNewYork@cityharvest.org"}</div>
                             </>
                         }
                ></Shelter>
            }></Card>

            <Card animated={false} style={style} Content={
                <Shelter title={"C.H.I.P.S."}
                         link={"https://chipsonline.org/"}
                         address={"200 4th Avenue, Park Slope, Brooklyn"}
                         info={"Usually accepting food donations 9am-4pm, Monday through Friday"}
                         contact={
                             <>
                                 <div>{"Contact the following email address to give them a heads up"}</div>
                                 <div>{"volunteer@chipsonline.org"}</div>
                             </>
                         }
                ></Shelter>
            }></Card>
        </div>

    </div>


}


function Shelter({title, content = "", link = "", address = "", info = "", contact = ""}) {
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
        {title}
        <div style={style2}>
            {content}
        </div>
        <div style={style2}>
            {link}
        </div>
        <div style={style2}>
            {address}
        </div>
        <div style={style2}>
            {info}
        </div>
        <div style={style2}>
            {contact}
        </div>
    </div>
}

