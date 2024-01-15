import { Route, Routes } from "react-router";
import Landing from "../components/Landing/landing";
import AddParticipants from "../components/add-participants/add-participants";
import CreateEvent from "../components/create-event/create-event";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/add-participants" element={<AddParticipants />} />
            <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
    );
};

export default AppRoutes;
