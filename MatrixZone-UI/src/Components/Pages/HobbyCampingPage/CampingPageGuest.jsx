import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CampingPage.css";

function CampingPageGuest() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const toggleContainer = () => {
        setIsOpen(!isOpen);

        setTimeout(() => {
            navigate(info.routes.profilePageGuest);
        }, 500);
    };

    return (
        <AnimatePresence>
            <div className="CampingPageContent">
                <motion.div
                    className="CampingContainer"
                    initial={{ height: "0%" }}
                    animate={{ height: isOpen ? "100%" : "0%" }}
                    exit={{ height: "0%" }}
                    transition={{ duration: 0.5 }}
                    exitBeforeEnter
                >
                    <div className="CampingTitle">
                        <h2>Camping</h2>
                    </div>
                    <div className="Camping">
                        <p>
                            vgsfbhndhfm...
                        </p>
                    </div>
                    <div className="Back">
                        <button className="BackButton" onClick={toggleContainer}>Back</button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default CampingPageGuest;