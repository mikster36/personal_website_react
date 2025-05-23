import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TwoStepAuthenticationPage from './2sa/TwoStepAuthenticationPage.tsx';
import { HelmetProvider } from "react-helmet-async";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    return (
        <>
            <HelmetProvider>
                <Router>
                    <>
                        <Routes>
                            <Route path={"/"} element={<TwoStepAuthenticationPage />} />
                            <Route path={"/two-step-authentication"} element={<TwoStepAuthenticationPage />} />
                        </Routes>
                    </>
                </Router>
            </HelmetProvider>

        </>
    );
}

export default App;
