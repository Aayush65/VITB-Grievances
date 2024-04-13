export const firstLoadComment = "The first loading may take some time due to free hosting";

export const serverURL = "https://grievance-server.aayush65.com"

fetch(`${serverURL}/tags`)
    .then(response => response.json())
    .then(data => {tags = data;})
    .catch();


export let tags = ["Placement Cell", "Exam Cell", "Admission Office", "Student Cell"];