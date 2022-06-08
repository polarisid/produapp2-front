import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import AdminReports from "./pages/AdminReports";
import OqcPage from "./pages/OQCPage";
const PagesRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/admin/home" element={<AdminHome />} />
				<Route path="/admin/reports" element={<AdminReports />} />
				<Route path="/oqc/home" element={<OqcPage />} />
			</Routes>
		</Router>
	);
};

export default PagesRoutes;
