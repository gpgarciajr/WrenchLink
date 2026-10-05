```javascript
// =========================================
// WRENCHLINK ADMIN
// =========================================


// SIDEBAR NAVIGATION

const navButtons =
    document.querySelectorAll(".nav-button");

const sections =
    document.querySelectorAll(".admin-section");


navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const sectionName =
            button.dataset.section;


        // Remove active state
        navButtons.forEach(function(item) {
            item.classList.remove("active");
        });


        // Add active state
        button.classList.add("active");


        // Hide sections
        sections.forEach(function(section) {
            section.classList.remove("active");
        });


        // Show selected section
        const selectedSection =
            document.getElementById(sectionName);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

    });

});


// LOGOUT

document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {

        alert("Admin logout will be connected to secure authentication next.");

    });


// SAVE SETTINGS

document
    .getElementById("saveSettingsBtn")
    .addEventListener("click", function() {

        const appName =
            document.getElementById("appName").value;

        alert(
            "Settings saved for " + appName +
            ". Database connection will be added next."
        );

    });
```
