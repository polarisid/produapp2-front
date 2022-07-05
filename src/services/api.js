import axios from "axios";

const baseAPI = axios.create({
	// baseURL: "http://localhost:5000",
	baseURL: "https://hidden-mesa-58705.herokuapp.com",
});

function getConfig(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}
async function signUp(signUpData) {
	await baseAPI.post("/signup", signUpData);
}

async function signIn(signInData) {
	return baseAPI.post("/signin", signInData);
}

async function getWorkpace(token) {
	return baseAPI.get("/items/workspace", getConfig(token));
}

async function changeStatus(token, id, status) {
	console.log(token, id, status);
	return baseAPI.patch(
		`/items/workspace/status/${id}`,
		status,
		getConfig(token)
	);
}

async function getAdminDashboard(asc, token) {
	return baseAPI.get(`/admin/items/workspace/${asc}`, getConfig(token));
}

async function createItem(itemData, token) {
	return baseAPI.post("/items/workspace", itemData, getConfig(token));
}

async function createItemBySupervisor(itemData, token) {
	return baseAPI.post("/supervisor/items", itemData, getConfig(token));
}

async function searchItemByOs(token, os) {
	return baseAPI.get(`/items/search/${os}`, getConfig(token));
}

async function getAllFinished(token) {
	return baseAPI.get(`/items/finished`, getConfig(token));
}

async function getHistoric(asc, token) {
	return baseAPI.get(`/admin/items/report/${asc}`, getConfig(token));
}
async function getUsersByAsc(asc) {
	return baseAPI.get(`/admin/users/${asc}`);
}
const api = {
	getHistoric,
	createItem,
	changeStatus,
	signUp,
	signIn,
	getWorkpace,
	searchItemByOs,
	getAdminDashboard,
	getAllFinished,
	createItemBySupervisor,
	getUsersByAsc,
};

export default api;
