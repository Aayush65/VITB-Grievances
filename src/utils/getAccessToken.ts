
export async function getAccessToken() {
    try {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
        const response = await fetch("http://localhost:3000/accesstoken", { method: 'GET', headers });
        const data = await response.json();
        if (data && data.message === "Unauthorised Access"){
            localStorage.clear();
            return false;
        }
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("name", data.name);
        if (data.regNo) {
            localStorage.setItem("regNo", data.regNo);
        } else {
            localStorage.setItem("empNo", data.empNo);
        }
        return true;
    } catch (err: unknown) {
        console.log(err);
        return false;
    }
}