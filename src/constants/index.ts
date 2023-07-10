fetch("https://grievance-server.aayush65.com/tags")
    .then(response => response.json())
    .then(data => {tags = data;})
    .catch();


export let tags = ["Placement Cell", "Exam Cell", "Admission Office", "Student Cell"];