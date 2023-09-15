import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./Nav.css";

function NavAdmin() {
    return (
        <nav className="NavContainer">
            <Buttons />
        </nav>
    );
}

function Buttons() {
    const navigate = useNavigate();

    return (
        <div className="ButtonContainer">
            <button id="btn1" onClick={() => navigate(info.routes.homePageAdmin)}>
                <div className="HomeIcon"></div>
                <h3 className="HomeText">Home</h3>
            </button>
            <button id="btn2" onClick={() => navigate(info.routes.profilePageAdmin)}>
                <div className="ProfileIcon"></div>
                <h3 className="ProfileText">Profile</h3>
            </button>
            <button id="btn6" onClick={() => navigate(info.routes.projectsPageAdmin)}>
                <div className="ProjectsIcon"></div>
                <h3 className="ProjectsText">Projects</h3>
            </button>
            <button id="btn4" onClick={() => navigate(info.routes.videosPageAdmin)}>
                <div className="VideosIcon"></div>
                <h3 className="VideosText">Videos</h3>
            </button>
            <button id="btn5" onClick={() => navigate(info.routes.goalsPageAdmin)}>
                <div className="GoalsIcon"></div>
                <h3 className="GoalsText">Goals</h3>
            </button>
            <button id="btn3" onClick={() => navigate(info.routes.cvPageAdmin)}>
                <div className="CVIcon"></div>
                <h3 className="CVText">CV</h3>
            </button>
        </div>
    );
}

export default NavAdmin;
