import { useState, useEffect } from "react";
import { notification } from "antd";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ContactPage.css";

function ContactPageGuest() {
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Simulate loading for 1 second:
        const timer = setTimeout(() => {
            setLoading(false);
            if (load === "true") {
                notification.success({
                    message: "LOGGED IN!",
                    description: "Welcome to the MatrixZone Guest.",
                    placement: "bottomLeft",
                    style: {
                        backgroundColor: "lightgreen",
                        border: "3px solid green",
                    },
                });
            }
            sessionStorage.setItem("load", "false");
        }, 1000);

        //Clean up the timer to prevent memory leaks:
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading && load === "true" ? (
                //Loading component here:
                <LoadingScreen />
            ) : (
                <div>
                    <HeaderGuest />
                    <NavGuest />
                    <div className="ContactPageContainer">
                        <div className="Breadcrumb">
                            <h2>Guest / contact</h2>
                        </div>
                        <ContactPageTitle />
                        <ContactPageContent />
                    </div>
                    <FooterGuest />
                </div>
            )}
        </div>
    );
}

function ContactPageTitle() {
    return (
        <div className="ContactPageTitleContainer">
            <h2>CONTACT</h2>
        </div>
    );
}

function ContactPageContent() {
    return <div className="ContactPageContentContainer"></div>;
}

export default ContactPageGuest;
