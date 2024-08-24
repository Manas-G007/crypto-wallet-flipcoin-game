const BackGround = () => {
    return (
        <div className="back-container">
            <Circle size={"700px"} color={"#0E21A0"} 
            top={"10"} left={"75"}/>
            <Circle size={"700px"} color={"#4D2DB7"} 
            top={"55"} left={"5"}/>
            <Circle size={"700px"} color={"#9D44C0"} 
            top={"10"} left={"30"}/>
            <Circle size={"700px"} color={"#EC53B0"} 
            top={"55"} left={"55"}/>
        </div>
    );
}

export default BackGround;

const Circle = ({ size, color,top,left }: any) => {
    return (
        <div style={{ 
            position:"fixed",
            height: size, 
            width: size, 
            background: color, 
            borderRadius: "50%",
            top:top+"%",
            left:left+"%"
             }}
             className="grow-shrink-ani">
        </div>
    );
}