// App.jsx

import Load from "@/comcom/Preload"
import NavigationDesktop from "./components/NavigationDesktop";
import BodyDesktop from "./components/BodyDesktop";
import Footer from "./components/footer";
import { lazy } from "react";
const Alert = lazy(() => import("../../comcom/Alert"));


const App = () => {
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex flex-col">
                <title>HoPoN</title>
                <NavigationDesktop />
                <BodyDesktop />
                <Footer />
                <Alert />
            </div>
        </Load >
    );
};

export default App;

