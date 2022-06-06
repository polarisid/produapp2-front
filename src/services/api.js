import axios from "axios";

const baseAPI = axios.create({
	baseURL: "http://localhost:5000",
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

async function createItem(itemData, token) {
	return baseAPI.post("/items/workspace", itemData, getConfig(token));
}

async function searchItemByOs(token, os) {
	return baseAPI.get(`/items/search/${os}`, getConfig(token));
}

const api = {
	createItem,
	changeStatus,
	signUp,
	signIn,
	getWorkpace,
	searchItemByOs,
};

export default api;
