import "../css/Arrow.css";
import arrow from "../assets/arrow.gif";
const Arrow = () => {
    return (
        <div className="arrow">
            <img className="success-icon" src={arrow} alt="Success" />
        </div>
    )
}

export default Arrow;