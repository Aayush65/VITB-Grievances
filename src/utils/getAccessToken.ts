
export async function getAccessToken() {
    try {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("refreshToken")}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
        const response = await fetch("http://localhost:3000/accesstoken", { method: 'GET', headers });
        const data = await response.json();
        if (!data || data.message){
            localStorage.clear();
            return false;
        }
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("name", data.name);
        localStorage.setItem("regNo", data.regNo);
        localStorage.setItem("year", data.year);
        localStorage.setItem("email", data.email);
        return true;
    } catch (err: unknown) {
        console.log(err);
        localStorage.clear();
        return false;
    }
}