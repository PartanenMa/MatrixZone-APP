import { useState, useEffect } from "react";
import { notification } from "antd";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectsPage.css";

function ProjectsPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(data.projectsData);
    }, []);

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    notification.success({
                        message: "LOGGED IN AS ADMIN",
                        description: "Welcome back!",
                        placement: "bottomLeft",
                        style: {
                            backgroundColor: "lightgreen",
                            border: "3px solid green",
                        },
                    });
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

    if (isLoggedIn === "true") {
        return (
            <div>
                {loading && load === "true" ? (
                    //Loading component here:
                    <LoadingScreen />
                ) : (
                    <div>
                        <HeaderAdmin />
                        <NavAdmin />
                        <div className="ProjectsPageContainerAdmin">
                            <div className="Breadcrumb">
                                <h2>Admin / projects</h2>
                            </div>
                            <ProjectsPageTitle />
                            <AboutMyProjects />
                            <Projects projects={projects} />
                        </div>
                        <FooterAdmin />
                    </div>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

function ProjectsPageTitle() {
    return (
        <div className="ProjectsPageTitleContainer">
            <h2>MY PROJECTS</h2>
        </div>
    );
}

function AboutMyProjects() {
    return (
        <div className="AboutMyProjectsContainer">
            <div className="AboutMyProjectsTitle">
                <h3>ABOUT MY PROJECTS</h3>
            </div>
            <div className="AboutMyProjectsContent">
                <AnimatePresence>
                    <motion.a
                        className="AboutMyProjectsPhoto"
                        title="My GitHub"
                        href={info.GitHub.link}
                        target="_blank"
                        key="aboutmyprojectsphotoA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="AboutMyProjectsTextContainer">
                    <div className="AboutMyProjectsTextTitle">
                        <h4 className="h4_1">{info.GitHub.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="AboutMyProjectsText">
                        <p>
                            {info.GitHub.description1}
                            <br />
                            <br />
                            {info.GitHub.description2}
                            <br />
                            <br />
                            {info.GitHub.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Projects({ projects }) {
    return (
        <div className="ProjectsContainer">
            <div className="ProjectsTitle">
                <h3>PROJECTS</h3>
            </div>
            <div className="ProjectsContent">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <AnimatePresence>
                            <motion.div
                                className="Project"
                                key={index}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="ProjectTitle">
                                    <h4>{project.title}</h4>
                                </div>
                                <div className="ProjectContent">
                                    <div className="ProjectContentDescription">
                                        <div className="PCDBox1">
                                            <p>
                                                Project type:{" "}
                                                <span style={{ color: "white", fontSize: "15px" }}>{project.type}</span>
                                            </p>
                                        </div>
                                        <div className="PCDBox2">
                                            <div className="PCDBox2Title">
                                                <p>Project description:</p>
                                            </div>
                                            <div className="PCDBox2Content">
                                                <p>{project.description}</p>
                                            </div>
                                        </div>
                                        <div className="PCDBox3">
                                            <p>
                                                Technologies used:{" "}
                                                <span style={{ color: "white", fontSize: "15px" }}>{project.tech}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="ProjectContentPhoto"
                                        style={{ backgroundImage: `url(${project.image})` }}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))
                ) : (
                    <div className="NoProjectsData">
                        <h4>NO DATA!</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectsPageAdmin;