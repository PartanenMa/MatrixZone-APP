import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./GoalsPage.scss";

function GoalsPage() {
    const [loadingData, setLoadingData] = useState(true);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setGoals(data.goalsData);
            setLoadingData(false);
        }, [1000]);
    }, []);

    return (
        <div className="gP">
            <div className="goalsPageContainer">
                <GoalsPageTitle />
                <GoalsCount loadingData={loadingData} goals={goals} />
                {data.statusDB !== "disabled" && <GoalsStatus loadingData={loadingData} />}
                <GoalsPageContent loadingData={loadingData} goals={goals} />
            </div>
        </div>
    );
}

function GoalsPageTitle() {
    return (
        <div className="goalsPageTitleContainer">
            <h2>GOALS</h2>
        </div>
    );
}

function GoalsCount({ loadingData, goals }) {
    const getLoader = () => {
        return (
            <AnimatePresence>
                <motion.span style={{ fontStyle: "normal" }} key="goalloader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ...
                </motion.span>
            </AnimatePresence>
        );
    };

    const getCompletedGoals = () => {
        let completedCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "completed") {
                completedCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{completedCount + " ✔️"}</span>;
    };

    const getInProgressGoals = () => {
        let inProgressCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "inprogress") {
                inProgressCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{inProgressCount + " 🟡"}</span>;
    };

    const getNotYetStartedGoals = () => {
        let notYetStartedCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "notyetstarted") {
                notYetStartedCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{notYetStartedCount + " ❌"}</span>;
    };

    return (
        <div className="goalsCountContainer">
            <AnimatePresence>
                <motion.p key="goalcount1" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    COMPLETED: <span style={{ color: "green" }}>{loadingData ? getLoader() : getCompletedGoals()}</span>
                </motion.p>
                <motion.p key="goalcount2" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    IN PROGRESS: <span style={{ color: "yellow" }}>{loadingData ? getLoader() : getInProgressGoals()}</span>
                </motion.p>
                <motion.p key="goalcount3" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    NOT YET STARTED: <span style={{ color: "red" }}>{loadingData ? getLoader() : getNotYetStartedGoals()}</span>
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

function GoalsStatus({ loadingData }) {
    return (
        !loadingData && (
            <AnimatePresence>
                <motion.div className="goalsStatusContainer" key="gstatuscont" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {data?.statusDB ? (
                        <motion.p className="gStatus1" key="goalstatus1" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            FROM: DB MAIN
                        </motion.p>
                    ) : (
                        <motion.p className="gStatus2" key="goalstatus2" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            FROM: DB BACKUP
                        </motion.p>
                    )}
                </motion.div>
            </AnimatePresence>
        )
    );
}

function GoalsPageContent({ loadingData, goals }) {
    const getColor = (status) => {
        if (status === "completed") {
            return "green";
        } else if (status === "inprogress") {
            return "yellow";
        } else if (status === "notyetstarted") {
            return "red";
        }
    };

    const getStatus = (status) => {
        if (status === "completed") {
            return "COMPLETED ✔️";
        } else if (status === "inprogress") {
            return "IN PROGRESS 🟡";
        } else if (status === "notyetstarted") {
            return "NOT YET STARTED ❌";
        }
    };

    return (
        <div className="goalsPageContentContainer">
            <AnimatePresence>
                {goals.length > 0 ? (
                    goals.map((goal, index) => (
                        <motion.div className="goal" key={index} transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <h3>
                                {goal.title}: <span style={{ color: getColor(goal.status), fontStyle: "normal" }}>{getStatus(goal.status)}</span>
                            </h3>
                            <p>
                                - {goal.step1.step} <span style={{ color: getColor(goal.step1.status), fontStyle: "normal" }}>{getStatus(goal.step1.status)}</span>
                            </p>
                            <p>
                                - {goal.step2.step} <span style={{ color: getColor(goal.step2.status), fontStyle: "normal" }}>{getStatus(goal.step2.status)}</span>
                            </p>
                            <p>
                                - {goal.step3.step} <span style={{ color: getColor(goal.step3.status), fontStyle: "normal" }}>{getStatus(goal.step3.status)}</span>
                            </p>
                        </motion.div>
                    ))
                ) : loadingData ? (
                    <motion.div className="loadingGoalsData" key="loadinggoalsdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="loaderGoals" />
                    </motion.div>
                ) : (
                    <motion.div className="noGoalsData" key="nogoalsdataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                        <h4>NO DATA!</h4>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default GoalsPage;
