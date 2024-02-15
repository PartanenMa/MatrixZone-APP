import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.scss";

function ProfilePageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            getProfession();
            getJob();
            getProfile();
        } else {
            setTimeout(() => {
                setLanguages(dataFe.profileData.languages);
                setEducations(dataFe.profileData.educations);
                setSkills(dataFe.profileData.skills);
                setExperiences(dataFe.profileData.experiences);
                setLoadingProfessionData(false);
            }, 1000);
        }
    }, []);

    const getProfession = async () => {
        let statusCode;

        try {
            await fetch("/profession")
                .then((res) => {
                    statusCode = res.status;
                    return res.json();
                })
                .then((data) => {
                    setProfessionData(data);
                });
        } catch (error) {
            console.error("Error fetching profession data:", error);
            console.error("Status code:", statusCode);
        }
    };

    const getJob = async () => {
        let statusCode;

        try {
            await fetch("/job")
                .then((res) => {
                    statusCode = res.status;
                    return res.json();
                })
                .then((data) => {
                    setJobData(data);
                });
        } catch (error) {
            console.error("Error fetching job data:", error);
            console.error("Status code:", statusCode);
        }
    };

    const getProfile = async () => {
        let statusCode;

        try {
            await fetch("/profile")
                .then((res) => {
                    statusCode = res.status;
                    return res.json();
                })
                .then((data) => {
                    setTimeout(() => {
                        setLanguages(data.profileData.languages);
                        setEducations(data.profileData.educations);
                        setSkills(data.profileData.skills);
                        setExperiences(data.profileData.experiences);
                        setStatusDB(true);
                        setLoadingProfessionData(false);
                    }, 1000);
                });
        } catch (error) {
            console.error("Error fetching profile data:", error);
            console.error("Status code:", statusCode);
            setLoadingProfessionData(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    triggerNotification("LOGGED IN AS ADMIN", "Welcome back!", "success");
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        // Close the notification after 5 seconds
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

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
                        <div className="profilePageContainerAdmin">
                            <div className="breadcrumb">
                                <h2>Admin / profile</h2>
                            </div>
                            <ProfileAdminPageTitle />
                            <AboutMe professionData={professionData} jobData={jobData} />
                            <Languages loadingProfessionData={loadingProfessionData} statusDB={statusDB} languages={languages} />
                            <Education loadingProfessionData={loadingProfessionData} statusDB={statusDB} educations={educations} />
                            <Skills loadingProfessionData={loadingProfessionData} statusDB={statusDB} skills={skills} />
                            <Experience loadingProfessionData={loadingProfessionData} statusDB={statusDB} experiences={experiences} />
                            <Interests />
                            <Hobbies />
                            <ContactMe />
                            <Notification
                                isNotificationOpen={isNotificationOpen}
                                setIsNotificationOpen={setIsNotificationOpen}
                                title={notificationContent.title}
                                description={notificationContent.description}
                                type={notificationContent.type}
                            />
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

function ProfileAdminPageTitle() {
    return (
        <div className="profilePageTitleContainer">
            <h2>MY PROFILE</h2>
        </div>
    );
}

function AboutMe({ professionData, jobData }) {
    let description1 = "Hello, I'm Manu Partanen, a passionate software developer specializing in web development.";
    let description2 =
        "With a strong foundation in HTML, CSS, and JavaScript, I enjoy creating dynamic and responsive websites using modern front-end technologies like " +
        (jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTechStackFe : professionData?.professionStatus?.professionTechStackFe) +
        ". On the back-end, I'm currently working with " +
        (jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTechStackBe : professionData?.professionStatus?.professionTechStackBe) +
        ". " +
        (jobData?.jobStatus?.employed ? "Besides my job, " : "") +
        "I love working on my own projects during my free time using the skills that I've gained, and enjoy learning new tools and technologies while doing so.";
    let description3 =
        "In addition to my technical skills, I am a strong collaborator and enjoy working in agile development environments. I believe in continuous learning and staying up-to-date with the latest tech and best practices.";

    return (
        <div className="aboutMeContainer">
            <div className="aboutMeTitle">
                <h3>ABOUT ME</h3>
            </div>
            <div className="aboutMeContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMePhoto"
                        title="My LinkedIn"
                        href={info.LinkedIn.link}
                        target="_blank"
                        key="aboutmephotoA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMeTextContainer">
                    <div className="aboutMeTextTitle">
                        <h4 className="h4_1">{info.LinkedIn.name}</h4>
                        {info.api.enabled ? (
                            professionData?.professionStatus || jobData?.jobStatus ? (
                                <h4 className="h4_2">
                                    {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company
                                        ? jobData?.jobStatus?.jobTitle + " at " + jobData?.jobStatus?.company
                                        : professionData?.professionStatus?.profession}
                                </h4>
                            ) : (
                                <h4 className="h4_2" style={{ color: "red", textShadow: "none" }}>
                                    API DISCONNECTED!
                                </h4>
                            )
                        ) : (
                            <h4 className="h4_2">
                                {dataFe.jobStatus.employed && info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTitle + " at " + info.LinkedIn.company : info.LinkedIn.profession}
                            </h4>
                        )}
                    </div>
                    <div className="aboutMeText">
                        {info.api.enabled ? (
                            professionData?.professionStatus && (
                                <p>
                                    {description1}
                                    <br />
                                    <br />
                                    {description2}
                                    <br />
                                    <br />
                                    {description3}
                                </p>
                            )
                        ) : (
                            <p>
                                {info.LinkedIn.description1}
                                <br />
                                <br />
                                {info.LinkedIn.description2}
                                <br />
                                <br />
                                {info.LinkedIn.description3}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Languages({ loadingProfessionData, statusDB, languages }) {
    return (
        <div className="languagesContainer">
            <div className="languagesTitle">
                <h3>
                    MY LANGUAGES
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="languagesContent">
                <AnimatePresence>
                    {languages.length > 0 ? (
                        languages.map((language, index) => (
                            <motion.div
                                className="language"
                                style={{ backgroundColor: language.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                            >
                                <div className="languageLogo" style={{ backgroundImage: `url(${language.image})` }} />
                                <div className="languageContent">
                                    <h4>{language.name}</h4>
                                    <p>{language.proficiency}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfessionData ? (
                        <motion.div className="loadingProfileData" key="loadinglangprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="nolangprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Education({ loadingProfessionData, statusDB, educations }) {
    const [isVisibleEd, setIsVisibleEd] = useState(Array(educations.length).fill(false));

    const openOrCloseEducation = (index) => {
        const updatedVisibility = [...isVisibleEd];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEd(updatedVisibility);
    };

    return (
        <div className="educationsContainer">
            <div className="educationsTitle">
                <h3>
                    MY EDUCATION
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="educationsContent">
                <AnimatePresence>
                    {educations.length > 0 ? (
                        educations.map((education, index) => (
                            <motion.div
                                className="education"
                                style={{ "--education-color": education.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                onClick={() => openOrCloseEducation(index)}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="educationTitle">
                                    <h4>{education.schoolName}</h4>
                                </div>
                                <div className="educationContent1" style={{ backgroundColor: education.color }}>
                                    <p>{education.degreeName}</p>
                                    <p>{education.timeAndPlace}</p>
                                    <div
                                        className="schoolLogo"
                                        style={{
                                            backgroundImage: `url(${education.image})`,
                                            backgroundColor: !education.image && education.color,
                                            backgroundPosition: index === 1 && "45% 50%",
                                            backgroundSize: index === 1 && "40%",
                                        }}
                                    />
                                </div>
                                <div className="educationContent2" style={{ display: isVisibleEd[index] ? "block" : "none" }}>
                                    <p>{education.educationDescription}</p>
                                    <p>{education.extra}</p>
                                    <p className="subjects">
                                        Education subjects: <span style={{ color: "white" }}>{education.educationSubjects}.</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfessionData ? (
                        <motion.div className="loadingProfileData" key="loadingedprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="noedprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Skills({ loadingProfessionData, statusDB, skills }) {
    const getSkillLevelTitle = (skillLevel) => {
        if (skillLevel === "beginner") {
            return "Beginner";
        } else if (skillLevel === "experienced") {
            return "Experienced";
        } else if (skillLevel === "intermediate") {
            return "Intermediate";
        } else if (skillLevel === "advanced") {
            return "Advanced";
        } else if (skillLevel === "professional") {
            return "Professional";
        }
    };

    const getSkillLevel = (skillLevel) => {
        if (skillLevel === "beginner") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>*</span>****
                </div>
            );
        } else if (skillLevel === "experienced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>**</span>***
                </div>
            );
        } else if (skillLevel === "intermediate") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>***</span>**
                </div>
            );
        } else if (skillLevel === "advanced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>****</span>*
                </div>
            );
        } else if (skillLevel === "professional") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>*****</span>
                </div>
            );
        }
    };

    return (
        <div className="skillsContainer">
            <div className="skillsTitle">
                <h3>
                    MY SKILLS
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="skillsContent">
                <div className="webDevelopmentSoftware">
                    <div className="wDSTitle">
                        <h4>{info.LinkedIn.skillsTitle1}</h4>
                    </div>
                    <div className="wDSContent">
                        <AnimatePresence>
                            {skills.webDevelopmentSoftware?.utilitySoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.cLISoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.containerizationSoftware?.length > 0 ? (
                                <>
                                    <div className="software">
                                        <h5>{info.LinkedIn.skills1SubTitle1}</h5>
                                        {skills.webDevelopmentSoftware.utilitySoftware.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="software">
                                        <h5>{info.LinkedIn.skills1SubTitle2}</h5>
                                        {skills.webDevelopmentSoftware.cLISoftware.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="software">
                                        <h5>{info.LinkedIn.skills1SubTitle3}</h5>
                                        {skills.webDevelopmentSoftware.containerizationSoftware.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfileData" key="loadingwdsprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nowdsprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="front-endDevelopment">
                    <div className="fEDTitle">
                        <h4>{info.LinkedIn.skillsTitle2}</h4>
                    </div>
                    <div className="fEDContent">
                        <AnimatePresence>
                            {skills.frontEndDevelopment?.frontEndProgrammingLanguages?.length > 0 &&
                            skills.frontEndDevelopment?.frontEndFrameworks?.length > 0 &&
                            skills.frontEndDevelopment?.cSSFrameworks?.length > 0 ? (
                                <>
                                    <div className="frontEndSoftware">
                                        <h5>{info.LinkedIn.skills2SubTitle1}</h5>
                                        {skills.frontEndDevelopment.frontEndProgrammingLanguages.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftware">
                                        <h5>{info.LinkedIn.skills2SubTitle2}</h5>
                                        {skills.frontEndDevelopment.frontEndFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftware">
                                        <h5>{info.LinkedIn.skills2SubTitle3}</h5>
                                        {skills.frontEndDevelopment.cSSFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfileData" key="loadingfedprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nofedprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="back-endDevelopment">
                    <div className="bEDTitle">
                        <h4>{info.LinkedIn.skillsTitle3}</h4>
                    </div>
                    <div className="bEDContent">
                        <AnimatePresence>
                            {skills.backEndDevelopment?.backEndProgrammingLanguages?.length > 0 &&
                            skills.backEndDevelopment?.backEndFrameworks?.length > 0 &&
                            skills.backEndDevelopment?.databases?.length > 0 ? (
                                <>
                                    <div className="backEndSoftware">
                                        <h5>{info.LinkedIn.skills3SubTitle1}</h5>
                                        {skills.backEndDevelopment.backEndProgrammingLanguages.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftware">
                                        <h5>{info.LinkedIn.skills3SubTitle2}</h5>
                                        {skills.backEndDevelopment.backEndFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftware">
                                        <h5>{info.LinkedIn.skills3SubTitle3}</h5>
                                        {skills.backEndDevelopment.databases.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfileData" key="loadingbedprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nobedprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Experience({ loadingProfessionData, statusDB, experiences }) {
    const [isVisibleEx, setIsVisibleEx] = useState(Array(experiences.length).fill(false));

    const openOrCloseExperience = (index) => {
        const updatedVisibility = [...isVisibleEx];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEx(updatedVisibility);
    };

    return (
        <div className="experiencesContainer">
            <div className="experiencesTitle">
                <h3>
                    MY EXPERIENCE
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="experiencesContent">
                <AnimatePresence>
                    {experiences.length > 0 ? (
                        experiences.map((experience, index) => (
                            <motion.div
                                className="experience"
                                style={{ "--experience-color": experience.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                onClick={() => openOrCloseExperience(index)}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="experienceTitle">
                                    <h4>{experience.companyName}</h4>
                                </div>
                                <div className="experienceContent1" style={{ backgroundColor: experience.color }}>
                                    <p>{experience.workTitle}</p>
                                    <p>{experience.workTimeAndPlace}</p>
                                    <div className="companyLogo" style={{ backgroundImage: `url(${experience.image})`, backgroundColor: !experience.image && experience.color }} />
                                </div>
                                <div className="experienceContent2" style={{ display: isVisibleEx[index] ? "block" : "none" }}>
                                    <p>{experience.workDescription}</p>
                                    <p className="usedTech">
                                        Technologies used: <span style={{ color: "white" }}>{experience.workTech}.</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfessionData ? (
                        <motion.div className="loadingProfileData" key="loadingexpprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="noutilexpprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Interests() {
    return (
        <div className="interestsContainer">
            <div className="interestsTitle">
                <h3>MY INTERESTS</h3>
            </div>
            <div className="interestsContent">
                <div className="interest1">
                    <div className="interest1Title">
                        <h4>IT infrastructure</h4>
                    </div>
                    <div className="interest1Content">
                        <div className="interest1ContentCover">
                            <div className="interest1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="interest2">
                    <div className="interest2Title">
                        <h4>Software Development</h4>
                    </div>
                    <div className="interest2Content">
                        <div className="interest2ContentCover">
                            <div className="interest2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="interest3">
                    <div className="interest3Title">
                        <h4>Robotics</h4>
                    </div>
                    <div className="interest3Content">
                        <div className="interest3ContentCover">
                            <div className="interest3ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Hobbies() {
    return (
        <div className="hobbiesContainer">
            <div className="hobbiesTitle">
                <h3>MY HOBBIES</h3>
            </div>
            <div className="hobbiesContent">
                <div className="hobby1">
                    <div className="hobby1Title">
                        <h4>Gaming</h4>
                    </div>
                    <div className="hobby1Content">
                        <div className="hobby1ContentCover">
                            <div className="hobby1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="hobby2">
                    <div className="hobby2Title">
                        <h4>Web development</h4>
                    </div>
                    <div className="hobby2Content">
                        <div className="hobby2ContentCover">
                            <div className="hobby2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="hobby3">
                    <div className="hobby3Title">
                        <h4>Camping</h4>
                    </div>
                    <div className="hobby3Content">
                        <div className="hobby3ContentCover">
                            <div className="hobby3ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactMe() {
    return (
        <div className="contactContainer">
            <div className="contactTitle">
                <h3>MY CONTACT INFO</h3>
            </div>
            <div className="contactContent">
                <div className="phoneContainer">
                    <div className="phoneContainerTitle">
                        <h3>
                            PHONE<span style={{ fontStyle: "normal", textShadow: "none", paddingLeft: "5px" }}>☎️</span>
                        </h3>
                    </div>
                    <div className="phoneContainerContent">
                        <div className="phone1">
                            <h4>{info.LinkedIn.phoneNumber}</h4>
                        </div>
                        <div className="phone2"></div>
                    </div>
                </div>
                <div className="emailContainer">
                    <div className="emailContainerTitle">
                        <h3>
                            EMAIL<span style={{ fontStyle: "normal", textShadow: "none", paddingLeft: "5px" }}>📧</span>
                        </h3>
                    </div>
                    <div className="emailContainerContent">
                        <div className="email1">
                            <h4>{info.LinkedIn.emailAddress}</h4>
                        </div>
                        <div className="email2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePageAdmin;
