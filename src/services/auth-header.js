export default async function authHeader() {
	const user = await JSON.parse(localStorage.getItem("user"));

	if (user) {
		return {"x-auth-token": user};
	} else {
		return {};
	}
}