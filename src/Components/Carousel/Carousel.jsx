import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Carousel.scss";

function Carousel({ images, height, width }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };
    const slidersVariants = {
        hover: {
            scale: 1.2,
            backgroundColor: "lightgreen",
        },
    };
    const dotsVariants = {
        initial: {
            y: 0,
        },
        animate: {
            y: -10,
            scale: 1.2,
            transition: { type: "spring", stiffness: 1000, damping: "10" },
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setDirection("left");

        setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    return (
        <>
            {windowWidth >= 1280 && (
                <div className="carousel">
                    <div className="carousel-images" style={{ height: height, maxWidth: width }}>
                        <AnimatePresence>
                            <motion.img
                                key={currentIndex}
                                src={images[currentIndex]}
                                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                                animate="visible"
                                exit="exit"
                                variants={slideVariants}
                            />
                        </AnimatePresence>
                        <div className="slide_direction">
                            <motion.div variants={slidersVariants} whileHover="hover" className="left" onClick={handlePrevious}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
                                    <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                                </svg>
                            </motion.div>
                            <motion.div variants={slidersVariants} whileHover="hover" className="right" onClick={handleNext}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
                                    <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                    <div className="carousel-indicator">
                        {images.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`dot ${currentIndex === index ? "active" : ""}`}
                                onClick={() => handleDotClick(index)}
                                initial="initial"
                                animate={currentIndex === index ? "animate" : ""}
                                whileHover="hover"
                                variants={dotsVariants}
                            ></motion.div>
                        ))}
                    </div>
                </div>
            )}
            {windowWidth < 1280 && (
                <CarouselMobile
                    images={images}
                    height={height}
                    width={width}
                    currentIndex={currentIndex}
                    direction={direction}
                    slideVariants={slideVariants}
                    slidersVariants={slidersVariants}
                    dotsVariants={dotsVariants}
                    handleNext={() => handleNext()}
                    handlePrevious={() => handlePrevious()}
                    handleDotClick={() => handleDotClick()}
                />
            )}
        </>
    );
}

//CarouselMobile:
function CarouselMobile({ images, height, width, currentIndex, direction, slideVariants, slidersVariants, dotsVariants, handleNext, handlePrevious, handleDotClick }) {
    return (
        <div className="carouselMobile">
            <div className="carousel-imagesMobile" style={{ height: height, maxWidth: width }}>
                <AnimatePresence>
                    <motion.img key={currentIndex} src={images[currentIndex]} initial={direction === "right" ? "hiddenRight" : "hiddenLeft"} animate="visible" exit="exit" variants={slideVariants} />
                </AnimatePresence>
                <div className="slide_directionMobile">
                    <motion.div variants={slidersVariants} whileHover="hover" className="leftMobile" onClick={handlePrevious}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
                            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                        </svg>
                    </motion.div>
                    <motion.div variants={slidersVariants} whileHover="hover" className="rightMobile" onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
                            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                        </svg>
                    </motion.div>
                </div>
            </div>
            <div className="carousel-indicatorMobile">
                {images.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`dot ${currentIndex === index ? "activeMobile" : ""}`}
                        onClick={() => handleDotClick(index)}
                        initial="initial"
                        animate={currentIndex === index ? "animate" : ""}
                        whileHover="hover"
                        variants={dotsVariants}
                    ></motion.div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
