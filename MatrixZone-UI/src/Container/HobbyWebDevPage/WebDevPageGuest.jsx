import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./WebDevPage.css";

function WebDevPageGuest() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const toggleContainer = () => {
        setIsOpen(!isOpen);

        setTimeout(() => {
            navigate(info.routes.profilePageGuest);
        }, 500);
    };

    return (
        <div>
            <HeaderGuest />
            <NavGuest />
            <div className="WebDevContainer">
                <div className="Breadcrumb">
                    <h2>Guest / profile / web_dev</h2>
                </div>
                <div className="WebDevTitle">
                    <h2>WEB DEVELOPMENT</h2>
                </div>
                <div className="WebDevContent">
                    <p>vgsfbhndhfm...</p>
                </div>
                <div className="WDPBack">
                    <button className="WDPBackButton" onClick={toggleContainer}>
                        Back
                    </button>
                </div>
            </div>
            <FooterGuest />
        </div>
    );
}

export default WebDevPageGuest;
