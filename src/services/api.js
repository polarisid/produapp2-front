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

async function createTask(taskData, token) {
	return baseAPI.post("/tasks/create/task", taskData, getConfig(token));
}

async function createColumn(columnData, token) {
	return baseAPI.post("/tasks/create/column", columnData, getConfig(token));
}

const api = {
	signUp,
	signIn,
	getWorkpace,
	createTask,
	createColumn,
};

export default api;
