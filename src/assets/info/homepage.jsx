import {Card} from "../components/card.jsx";
import {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";

export function HomepageContent ({StateHook, AuthState}) {
    const style = {
        left: 0, right: 0, backgroundColor: null, margin: 0, padding: 0
    }
    return <div style={style} className={"homepage"}>
        <div className={"homepageContainer"}>
            <div className={"homepageRow"} style={{flexWrap: "nowrap"}}>
                <Icon></Icon>
                <div className={"homepageCol"}>
                    <Heading text={"The Big Wild Apple"}></Heading>
                    <Tagline text={"A New York based nonprofit"}></Tagline>
                    <button onClick={() => {
                        StateHook("getinvolved")
                    }}>Go to Dashboard
                    </button>
                </div>
            </div>


            <div className={"homepageDuo"}>
                <div className={"slideshowContainer hdc"}>
                    <Slideshow startIndex={4} endIndex={7}></Slideshow>
                </div>
                <div className={"homepageCol hdc"}>
                    <Subheading text={"Mission Statement"}></Subheading>
                    <Tagline text={
                        "At The Big Wild Apple, our mission is to bridge the gap between abundance and need by connecting generous homeowners with volunteer apple pickers. We harness the surplus of fresh fruit from private gardens and channel it directly to local food shelters, ensuring that every apple contributes to nourishing our community. Through collaboration, compassion, and sustainability, we strive to reduce food waste and provide healthy, fresh produce to those in need throughout the New York City area."
                    }></Tagline>
                </div>
            </div>

            <div className={"homepageDuo"}>

                <div className={"homepageCol hdc"}>
                    <Subheading text={"Benefits"}></Subheading>
                    <Tagline text={
                        " - Tax Breaks"
                    }></Tagline>
                    <Tagline text={
                        "- Certificate of volunteering from a registered 501c3 non-profit "
                    }></Tagline>
                    <Tagline text={
                        "- Operate a food bank or charity? Receive fresh-picked fruits at no cost"
                    }></Tagline>
                </div>
                <div className={"slideshowContainer hdc"}>
                    <Slideshow startIndex={8} endIndex={12}></Slideshow>
                </div>
            </div>

            <div className={"homepageDuo"}>
                <div className={"slideshowContainer hdc"}>
                    <Slideshow startIndex={13} endIndex={19}></Slideshow>
                </div>
                <div className={"homepageCol hdc"}>
                    <Subheading text={"Join us today"}></Subheading>
                    <Tagline text={
                        " - Volunteers: Pick and drop off fruits"
                    }></Tagline>
                    <Tagline text={
                        "- Landowners: Schedule appointments for volunteers to pick fruits on your property"
                    }></Tagline>
                    <Tagline text={
                        "- Charities: Schedule delivery of fruits "
                    }></Tagline>
                    <button onClick={ () => {StateHook("register")}}>Sign up now</button>
                </div>

            </div>
            {/*<div className={"homepageRow"}>*/}
            {/*    <div className={"slideshowContainer"}>*/}
            {/*        <Slideshow></Slideshow>*/}
            {/*    </div>*/}
            {/*    <div className={"homepageCol"}>*/}
            {/*        <Subheading text={"Mission Statement"}></Subheading>*/}
            {/*        <Tagline text={*/}
            {/*            "At The Big Wild Apple, our mission is to bridge the gap between abundance and need by connecting generous homeowners with volunteer apple pickers. We harness the surplus of fresh fruit from private gardens and channel it directly to local food shelters, ensuring that every apple contributes to nourishing our community. Through collaboration, compassion, and sustainability, we strive to reduce food waste and provide healthy, fresh produce to those in need throughout the New York City area."*/}
            {/*        }></Tagline>*/}
            {/*    </div>*/}

            {/*</div>*/}

        </div>
    </div>

}

// import "../resources/images/icon.png"
function Icon() {
    const style = {
        aspectRatio: "1/1",
        width: "min(15vw, 15vh)",
        height: "min(15vw, 15vh)"
    }
    return <img style={style} src={"/public/icon.png"} alt={"Icon"}/>
}

function Subheading({text}) {
    const style = {
        fontSize: "min(3vh, 4vw)",
        fontFamily: "JustSansBold"
    }
    return <div style={style}>{text}</div>
}

function Heading({text}) {
    const style = {
        fontSize: "min(4vh, 6vw)",
        fontFamily: 'Geometos',

    }
    return <div style={style}>{text}
    </div>
}

function Slideshow({startIndex, endIndex}) {
    // const startIndex = 1;
    // const endIndex = 19;
    const slideshowDelayMS = 2000;
    const [slideshowState, setSlideshowState] = useState(startIndex)
    const url = "/public/slideshow-"  + slideshowState + ".jpeg"
    const [inProp, setInProp] = useState(false);
    const nodeRef = useRef(null);
    // setInProp(true)
    useEffect( () => { // preload images
        for (let i = startIndex; i < endIndex; i++) {
            (new Image()).src = "/public/slideshow-" + i + ".jpeg";
        }
    }, [])
    useEffect(() => {setTimeout( () => {
        setInProp(true)
    }, 100)}, [slideshowState])
    return (
        <div>
            <CSSTransition



                onEntered = {
                    () => {
                        setInProp(false)
                        // setSlideshowState(slideshowState + 1)
                    }
                }

                onExiting = {
                    ()=>{setTimeout( () => {
                        setSlideshowState( slideshowState != endIndex ? (slideshowState + 1) : startIndex)
                    }, 450)}
                    // () => {setSlideshowState(slideshowState + 1)}
                }



                mountOnEnter={true} unmountOnExit={false} nodeRef={nodeRef} in={inProp} timeout={10000} classNames="slideshow-transition">
                <div className={"slideshow"}>
                    <img ref={nodeRef} src={url} alt={"ss"}/>
                </div>

            </CSSTransition>
            {/*<button type="button" onClick=>*/}
            {/*    Click to Enter*/}
            {/*</button>*/}
        </div>
    );



}


function Tagline({text}) {
    const style = {
        fontSize: "min(2vh, 2.35vw)",
        fontFamily: "JustSansRegular",
        marginLeft: "0.5vw",
        marginBottom: "min(1vw, 1vh)"
    }
    return <div style={style}>{text}</div>
}