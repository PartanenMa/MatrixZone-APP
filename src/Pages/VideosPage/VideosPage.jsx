import { useState, useEffect } from "react";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideosPage.scss";

function VideosPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingVideosData, setLoadingVideosData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
            getVideos();
        } else {
            setTimeout(() => {
                setVideos(dataFe.videosData);
                setLoadingVideosData(false);
            }, 1000);
        }
    }, []);

    const checkConnection = () => {
        fetch("/connection", {
            method: "GET",
            credentials: "include",
        }).then(async (res) => {
            const statusCode = res.status;

            if (statusCode === 200) {
                setConnection(true);
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            } else {
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            }
        });
    };

    const getVideos = () => {
        fetch("/videos", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const data = await res.json();
                    return data;
                } else {
                    setLoadingVideosData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setVideos(data.videosData);
                    setStatusDB(true);
                    setLoadingVideosData(false);
                }, 1000);
            });
    };

    return (
        <div className="vP">
            <div className="videosPageContainer">
                <VideosPageTitle />
                {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                <AboutMyVideos />
                <Videos loadingVideosData={loadingVideosData} statusDB={statusDB} videos={videos} />
            </div>
        </div>
    );
}

function VideosPageTitle() {
    return (
        <div className="videosPageTitleContainer">
            <h2>VIDEOS</h2>
        </div>
    );
}

function AboutMyVideos() {
    return (
        <div className="aboutMyVideosContainer">
            <div className="aboutMyVideosTitle">
                <h3>ABOUT MY VIDEOS</h3>
            </div>
            <div className="aboutMyVideosContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyVideosPhoto"
                        title="My YouTube"
                        href={info.YouTube.link}
                        target="_blank"
                        key="aboutmyviedosphoto"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyVideosTextContainer">
                    <div className="aboutMyVideosTextTitle">
                        <h4 className="h4_1">{info.YouTube.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="aboutMyVideosText">
                        <p>
                            {info.YouTube.description1}
                            <br />
                            <br />
                            {info.YouTube.description2}
                            <br />
                            <br />
                            {info.YouTube.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Videos({ loadingVideosData, statusDB, videos }) {
    return (
        <div className="videosContainer">
            <div className="videosTitle">
                <h3>
                    VIDEOS
                    <DBstate loading={loadingVideosData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="videosContent">
                <AnimatePresence>
                    {videos.length > 0 ? (
                        videos[0].title !== 0 ? (
                            videos.map((video, index) => (
                                <motion.div
                                    className="video"
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="videoCoverTitle">
                                        <h2>{video.title}</h2>
                                    </div>
                                    <div className="videoTitle">
                                        <h4>{video.title}</h4>
                                    </div>
                                    <div className="videoContent">
                                        <div className="videoContentDescription">
                                            <div className="vCDBox1">
                                                <p>
                                                    Video category: <span style={{ color: "white", fontSize: "15px" }}>{video.category}</span>
                                                </p>
                                            </div>
                                            <div className="vCDBox2">
                                                <div className="vCDBox2Title">
                                                    <p>Video description:</p>
                                                </div>
                                                <div className="vCDBox2Content">
                                                    <p>{video.description}</p>
                                                </div>
                                            </div>
                                            <div className="vCDBox3">
                                                <p>
                                                    Video tags: <span style={{ color: "white", fontSize: "15px" }}>{video.tags}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="videoContentPhoto" style={{ backgroundImage: `url(${video.image})` }} />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div className="noVideosYet" key="novideosyet" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO VIDEOS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingVideosData ? (
                        <motion.div className="loadingVideosData" key="loadingvideosdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderVideos" />
                        </motion.div>
                    ) : (
                        <motion.div className="noVideosData" key="novideosdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default VideosPage;
