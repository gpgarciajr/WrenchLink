const sectionTitles = {
    dashboard: "Dashboard",
    users: "Customers",
    mechanics: "Mechanics",
    requests: "Service Requests",
    reviews: "Reviews",
    reports: "Reports",
    settings: "Settings"
};


function showSection(section) {

    const sections =
        document.querySelectorAll(".admin-section");

    sections.forEach(function(item) {

        item.classList.remove("active");

    });


    const selected =
        document.getElementById(section);

    if (selected) {

        selected.classList.add("active");

    }


    const pageTitle =
        document.getElementById("pageTitle");

    if (pageTitle) {

        pageTitle.textContent =
            sectionTitles[section] || "Dashboard";

    }

}


function saveSettings() {

    alert(
        "Settings will be connected to the WrenchLink database later."
    );

}


function logout() {

    const confirmation = confirm(
        "Are you sure you want to logout?"
    );


    if (confirmation) {

        window.location.href =
            "../index.html";

    }

}


function loadDashboardData() {

    console.log(
        "WrenchLink admin dashboard ready."
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        showSection("dashboard");

        loadDashboardData();

    }
);
