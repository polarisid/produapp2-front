import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
const PagesRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</Router>
	);
};

export default PagesRoutes;
