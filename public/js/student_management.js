$(".view-details-btn").on("click", function () {
    location.assign("/public/html/studentDetails.html");
});

export function searchStudent(queryText, studentList) {
    var i = 0;
    var searchResults = [];
    for (i = 0; i < studentList.length; i++) {
        if (studentList[i]["name"].search(queryText) != -1) {
            searchResults.add(studentList[i]);
        }
    }

    return searchResults;
}