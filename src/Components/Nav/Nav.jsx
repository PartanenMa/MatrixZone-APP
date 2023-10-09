import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Nav.css";

function Nav() {
    const navigate = useNavigate();

    const handleNavClick = (page) => {
        if (page === "home") {
            navigate(info.routes.homePage);
        } else if (page === "profile") {
            navigate(info.routes.profilePage);
        } else if (page === "projects") {
            navigate(info.routes.projectsPage);
        } else if (page === "videos") {
            navigate(info.routes.videosPage);
        } else if (page === "goals") {
            navigate(info.routes.goalsPage);
        } else if (page === "cv") {
            navigate(info.routes.cvPage);
        }
    };

    const handleLoginClick = () => {
        sessionStorage.setItem("logoutLoad", "false");
        navigate(info.routes.loginPage);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="NavOptions"
                key="navO"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="NavOptionsBar">
                    <motion.button
                        className="NavOBtn"
                        onClick={() => handleNavClick("home")}
                        key="navBtn1"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Home
                    </motion.button>
                    <motion.button
                        className="NavOBtn"
                        onClick={() => handleNavClick("profile")}
                        key="navBtn2"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Profile
                    </motion.button>
                    <motion.button
                        className="NavOBtn"
                        onClick={() => handleNavClick("projects")}
                        key="navBtn3"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Projects
                    </motion.button>
                    <motion.button
                        className="NavOBtn"
                        onClick={() => handleNavClick("videos")}
                        key="navBtn4"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Videos
                    </motion.button>
                    <motion.button
                        className="NavOBtn"
                        onClick={() => handleNavClick("goals")}
                        key="navBtn5"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Goals
                    </motion.button>
                    <motion.button
                        className="NavOBtn"
                        onClick={() => handleNavClick("cv")}
                        key="navBtn6"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        CV
                    </motion.button>
                </div>
                <motion.button
                    className="LoginButtonFP"
                    onClick={() => handleLoginClick()}
                    key="navB"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    Log in
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );
}

export default Nav;