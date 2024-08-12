export function AboutUsContent() {
    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "40% 40% 20%",
        gridTemplateColumns: "1fr"
    }
    return <div style={style}>
        <AboutUs gridRow={1}></AboutUs>
    </div>
}
function AboutUs({gridRow}) {
    const style = {
        fontSize: "15pt",
        display: "flex",
        gridRow: gridRow,
        justifyContent: "center",
        alignItems: "center",
        padding: "10%"
    }
    return <div style={style}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet dignissim diam. Donec nulla tortor, commodo quis semper at, fermentum sed ante. Morbi porttitor nibh lacus. Praesent quis urna magna. Phasellus convallis ut neque eget ultrices. Sed quis sapien nec ligula lacinia volutpat nec ac ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla faucibus ante at eleifend congue. Sed venenatis, dui et feugiat varius, turpis orci feugiat risus, in porta diam tortor quis massa.
        Vestibulum vestibulum at magna quis euismod. In condimentum interdum mi a blandit. In id mauris ac elit tincidunt pharetra eu ut tellus. Sed posuere eros eget diam molestie convallis. Donec fringilla eget arcu a sollicitudin. Vestibulum vitae tellus eu felis vehicula laoreet. Cras eleifend egestas quam et feugiat. Cras porta sollicitudin ipsum, eu facilisis tellus semper ac.
    </div>
}