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
        overflow: "visible",
        flexDirection: "column",
        paddingTop: "0vh",
        paddingBottom: 0

    }
    return <div>
        <div style={style}>
            <Card animated={false} style={style} Content={
                <CadenBio></CadenBio>
            }></Card>
            <Card animated={false} style={style} Content={
                <BeckettBio></BeckettBio>
            }></Card>
            <Card animated={false} style={style} Content={
                <TheirStory></TheirStory>
            }></Card>
        </div>

    </div>


}

function OurStory() {
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
        Our Story
        <div style={style2}>
            Caden Michaels grew up amidst the rolling hills and tranquil countryside of northwest Connecticut, where his family’s home was a sanctuary filled with lush gardens and fruit-bearing trees. From a young age, Caden found joy in the simple pleasures of the land, especially during the crisp autumn months when the apple trees would be heavy with fruit. Every fall, he and his brother, joined by friends, would eagerly gather the apples from the three towering trees, their laughter echoing through the orchard.

            But as the baskets overflowed with apples, it became clear that they had more than they could ever eat or store. Rather than letting the fruit go to waste, Caden’s family found a purpose for their bounty. They began loading up the apples and bringing them to a food shelter in Brooklyn, just across the street from the elementary school that Caden and his brother attended.

            This simple act of kindness sparked something much bigger. What started as a way to share the excess fruit with those in need soon grew into a cherished tradition, embodying the spirit of community and generosity. From these humble beginnings, The Big Wild Apple was born—a name that captures the connection between the Wile fruit trees of the Connecticut countryside with the heart of the The Big Apple.        </div>
    </div>
}

function TheirStory() {
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
        Their Story
        <div style={style2}>
            Caden and Beckett, though three years apart in age, have shared a unique and intertwined educational journey. Their story begins at Rivendell Montessori, where they first met as young students, and later continued at Park Slope Collegiate. Despite their age difference, their bond grew stronger through shared experiences.

            When Caden was in sixth grade, Beckett, then a ninth-grader with a passion for computer engineering, took Caden under his wing. Beckett introduced him to the world of technology by teaching him how to build a computer from scratch. This experience ignited a spark in Caden, who went on to procure parts and successfully build his own computer by the time he reached ninth grade—a machine that has accompanied him throughout high school.

            Their collaboration was more than just a technical project; it was a shared adventure. Caden and Beckett embarked on this endeavor as friends, united by a common goal: to create something amazing while making a positive impact on the world around them.
        </div>
    </div>
}

function CadenBio() {
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
        Caden Michaels
        <div style={style2}>
            {"Caden Michaels grew up spending time in the countryside of northwest Connecticut, where his family would spend weekends at a home with vegetable gardens as well as apple, pear, and peach trees. From a young age, Caden enjoyed picking the fruit in late summer and fall along with his brother and friends. But as the baskets overflowed, it became clear that they had more than they could ever eat or store. Rather than letting the fruit go to waste, Caden and his family thought this would be a great way to give back. They began loading up the apples and bringing them to a food shelter in Brooklyn, just across the street from the elementary school that Caden and his brother attended. This simple act sparked a bigger idea. What started as a way to share the excess fruit they picked with those in need, soon grew into a bigger concept for being able to connect many private homes with volunteers who could do the same. From these beginnings, The Big Wild Apple was born—a name that captures the connection between the wild fruit trees of the upstate and CT countryside with the heart of the The Big Apple."}
        </div>
    </div>
}

function BeckettBio() {
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
        Beckett Randlett
        <div style={style2}>
            Born and raised in Brooklyn, NY, Beckett has always had a love for problem solving and building things. After picking up programming at age ten and building full-stack webapps at age 15, he has become proficient in over ten programming languages.

        </div>
    </div>
}

