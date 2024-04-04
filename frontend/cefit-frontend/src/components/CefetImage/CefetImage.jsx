import logo from "../../images/logo.png";
import "./CefetImage.css";

function CefetImage(color){
    return(
        <div className="cefit-logo text-center rounded-5 m-auto">
            <div className={color}>
                <img src={logo} alt="foto cefit" className="p-1" width="100%" height="100%"/>
            </div>
        </div>
    );
}

export default CefetImage;