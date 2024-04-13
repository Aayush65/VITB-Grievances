
export async function getAccessToken() {
    try {
        if (!localStorage.getItem('refreshToken')) {
            return;
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
        const response = await fetch("https://grievance-server.aayush65.com/accesstoken", { method: 'GET', headers });
        const data = await response.json();
        if (data && data.message === "Unauthorised Access"){
            localStorage.clear();
            return false;
        }
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        const values = { name: data.name, regNo: data.regNo || "", empNo: data.empNo || "", isSuperUser: data.isSuperUser || false };
        return values;
    } catch (err: unknown) {
        return null;
    }
}