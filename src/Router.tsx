import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
const PagesRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</Router>
	);
};

export default PagesRoutes;
