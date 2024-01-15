import Header from "../header/header";
import './landing.css'

const Landing = () => {
    return (
        <div>
            <Header />
            <div className="landing-page">
                <h1 className="title">Welcome to Event Hub</h1>
                <h2 className="sub-title"> Your Ultimate Event Management Solution</h2>
                <p className="description">
                    Empower your event planning journey with Event Hub. Whether
                    you're hosting a conference, webinar, or social gathering, we provide
                    the tools you need to create, manage, and elevate your events.
                </p>
            </div>
        </div>
    );
};

export default Landing;
