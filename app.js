/* WrenchLink main JavaScript */

const WrenchLink = {
goTo: function (page) {
window.location.href = page;
},
findMechanic: function () {
this.goTo("mechanics.html");
},
becomeMechanic: function () {
this.goTo("become-mechanic.html");
},
getHelp: function () {
this.goTo("roadside.html");
},
browseMechanics: function () {
this.goTo("mechanics.html");
},
learnMore: function () {
this.goTo("about.html");
},
signIn: function () {
this.goTo("login.html");
},
signUp: function () {
this.goTo("signup.html");
},
postJob: function () {
this.goTo("post-job.html");
},
customerDashboard: function () {
this.goTo("customer-dashboard.html");
},
mechanicDashboard: function () {
this.goTo("mechanic-dashboard.html");
},
accountSettings: function () {
this.goTo("account-settings.html");
},
mechanicProfile: function (mechanicId) {
const page = mechanicId
? "mechanic-profile.html?id=" + encodeURIComponent(mechanicId)
: "mechanic-profile.html";

    this.goTo(page);
}

};

/* Navigation functions used by existing buttons */

function findMechanic() {
WrenchLink.findMechanic();
}

function becomeMechanic() {
WrenchLink.becomeMechanic();
}

function getHelp() {
WrenchLink.getHelp();
}

function browseMechanics() {
WrenchLink.browseMechanics();
}

function learnMore() {
WrenchLink.learnMore();
}

function signIn() {
WrenchLink.signIn();
}

function signUp() {
WrenchLink.signUp();
}

function postJob() {
WrenchLink.postJob();
}

/* Local storage helpers */

const WrenchLinkStorage = {
set: function (key, value) {
try {
localStorage.setItem(key, JSON.stringify(value));
return true;
} catch (error) {
console.error("WrenchLink could not save data:", error);
return false;
}
},

get: function (key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch (error) {
        console.error("WrenchLink could not read data:", error);
        return fallback;
    }
},

remove: function (key) {
    localStorage.removeItem(key);
},

clear: function () {
    localStorage.clear();
}

};

/* Current-user and login helpers */

function getCurrentUser() {
return WrenchLinkStorage.get("wrenchlinkCurrentUser", null);
}

function setCurrentUser(user) {
return WrenchLinkStorage.set("wrenchlinkCurrentUser", user);
}

function clearCurrentUser() {
WrenchLinkStorage.remove("wrenchlinkCurrentUser");
}

function isLoggedIn() {
return getCurrentUser() !== null;
}

function requireLogin() {
if (!isLoggedIn()) {
window.location.href = "login.html";
return false;
}

return true;

}

function logout() {
clearCurrentUser();
window.location.href = "index.html";
}

function goToPage(page) {
window.location.href = page;
}

/* Connect common navigation buttons without overriding existing handlers */

document.addEventListener("DOMContentLoaded", function () {
const currentPage = window.location.pathname
.split("/")
.pop()
.toLowerCase();

document.querySelectorAll("nav a").forEach(function (link) {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("/").pop().split("?")[0].toLowerCase();

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

document.querySelectorAll("button").forEach(function (button) {
    if (
        button.hasAttribute("onclick") ||
        button.dataset.wrenchlinkConnected === "true" ||
        button.type === "submit"
    ) {
        return;
    }

    const text = button.textContent.trim().toLowerCase();

    if (text.includes("find a mechanic") || text.includes("browse mechanics")) {
        button.addEventListener("click", findMechanic);
    } else if (text.includes("become a mechanic")) {
        button.addEventListener("click", becomeMechanic);
    } else if (text.includes("get help")) {
        button.addEventListener("click", getHelp);
    } else if (text.includes("learn more")) {
        button.addEventListener("click", learnMore);
    } else if (text === "sign in") {
        button.addEventListener("click", signIn);
    } else if (text.includes("create account") || text.includes("sign up")) {
        button.addEventListener("click", signUp);
    } else if (text.includes("post a job")) {
        button.addEventListener("click", postJob);
    }

    button.dataset.wrenchlinkConnected = "true";
});

});

const WRENCHLINK_VERSION = "3.1";
console.log("WrenchLink " + WRENCHLINK_VERSION + " loaded successfully.");
