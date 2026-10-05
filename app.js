// =========================================
// WRENCHLINK 2.0
// JAVASCRIPT
// =========================================


// FIND A MECHANIC
function findMechanic() {
    alert("Let's find a mechanic near you!");
}


// BECOME A MECHANIC
function becomeMechanic() {
    alert("Mechanic registration coming soon!");
}


// GET HELP
function getHelp() {
    alert("Roadside assistance coming soon!");
}


// BROWSE MECHANICS
function browseMechanics() {
    alert("Mechanic directory coming soon!");
}


// LEARN MORE
function learnMore() {
    alert("More WrenchLink information coming soon!");
}


// SIGN IN
function signIn() {
    alert("Sign-in coming soon!");
}


// =========================================
// BUTTON CONNECTIONS
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {

        const text = button.textContent.trim().toLowerCase();


        if (text.includes("find a mechanic")) {

            button.addEventListener("click", findMechanic);

        }


        else if (text.includes("become a mechanic")) {

            button.addEventListener("click", becomeMechanic);

        }


        else if (text.includes("get help")) {

            button.addEventListener("click", getHelp);

        }


        else if (text.includes("browse mechanics")) {

            button.addEventListener("click", browseMechanics);

        }


        else if (text.includes("learn more")) {

            button.addEventListener("click", learnMore);

        }


        else if (text.includes("sign in")) {

            button.addEventListener("click", signIn);

        }

    });

});
