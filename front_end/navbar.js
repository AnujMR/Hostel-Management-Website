$(function () {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
});

$(function () {
    $('#homeTab').on('click', function () {
        console.log("Clicked!");
    });
});
