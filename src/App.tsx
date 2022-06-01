import React from "react";
import PagesRoutes from "./Router";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
	return (
		<>
			<AuthProvider>
				{/* <ResetCSS /> */}
				<PagesRoutes />
			</AuthProvider>
		</>
	);
}

export default App;
