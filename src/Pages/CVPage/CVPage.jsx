import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CVPage.css";

function CVPage() {
    return (
        <div className="CVP">
            <Header />
            <div className="CVPageContainer">
                <CVPageTitle />
                <CVPageContent />
            </div>
            <Footer />
        </div>
    );
}

function CVPageTitle() {
    return (
        <div className="CVPageTitleContainer">
            <h2>CV</h2>
        </div>
    );
}

function CVPageContent() {
    return (
        <div className="CVPageContentContainer">
            <div className="CVContent">
                <h1>{info.LinkedIn.name}</h1>
                <h2>{info.LinkedIn.profession}</h2>
                <div />
            </div>
            <GeneratePDF />
        </div>
    );
}

export default CVPage;
