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

/* Existing navigation functions */

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

/* Safely decode stored JSON values */

function wrenchLinkDecode(value) {
let result = value;

for (let attempt = 0; attempt < 3 && typeof result === "string"; attempt++) {
    try {
        result = JSON.parse(result);
    } catch (error) {
        break;
    }
}

return result;

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
        const storedValue = localStorage.getItem(key);

        if (storedValue === null) {
            return fallback;
        }

        return wrenchLinkDecode(storedValue);
    } catch (error) {
        console.error("WrenchLink could not read data:", error);
        return fallback;
    }
},

remove: function (key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("WrenchLink could not remove data:", error);
    }
},

clear: function () {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("WrenchLink could not clear storage:", error);
    }
}

};

/* Current-user and login helpers */

function getCurrentUser() {
const user = WrenchLinkStorage.get("wrenchlinkCurrentUser", null);

if (!user || typeof user !== "object" || Array.isArray(user)) {
    return null;
}

if (!user.id || !user.email) {
    return null;
}

return user;

    
}

function setCurrentUser(user) {
if (!user || typeof user !== "object" || !user.id || !user.email) {
console.error("WrenchLink could not set the current user: invalid user data.");
return false;
}

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

/* Determine the correct dashboard for the signed-in account */

function getDashboardPage(user) {
if (!user) {
return null;
}

const role = String(user.role || "").toLowerCase();

if (role === "admin") {
    return "admin/index.html";
}

if (role === "mechanic" || user.mechanicId) {
    return "mechanic-dashboard.html";
}

if (role === "customer") {
    return "customer-dashboard.html";
}

return null;

}

/* Create a Dashboard link only for signed-in users */

function updateDashboardNavigation() {
const user = getCurrentUser();
const dashboardPage = getDashboardPage(user);

const navContainers = document.querySelectorAll(
    ".header-actions, .nav-container nav"
);

navContainers.forEach(function (container) {
    const existingDashboardLinks = container.querySelectorAll(
        '[data-wrenchlink-dashboard="true"]'
    );

    existingDashboardLinks.forEach(function (link) {
        link.remove();
    });

    if (!user || !dashboardPage) {
        return;
    }

    const dashboardLink = document.createElement("a");

    dashboardLink.href = dashboardPage;
    dashboardLink.textContent = "Dashboard";
    dashboardLink.setAttribute("data-wrenchlink-dashboard", "true");
    dashboardLink.setAttribute("aria-label", "Go to your dashboard");

    if (container.classList.contains("header-actions")) {
        dashboardLink.className = "btn btn-small btn-primary";

        const signInLink = container.querySelector(
            'a[href="login.html"]'
        );

        if (signInLink) {
            signInLink.remove();
        }

        container.prepend(dashboardLink);
    } else {
        dashboardLink.className = "wrenchlink-dashboard-link";
        container.appendChild(dashboardLink);
    }
});

}

/* Highlight the current navigation link and connect existing buttons */

document.addEventListener("DOMContentLoaded", function () {
const currentPage = window.location.pathname
.split("/")
.pop()
.toLowerCase();

document.querySelectorAll("nav a").forEach(function (link) {
    const href = link.getAttribute("href");

    if (!href) {
        return;
    }

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

    if (
        text.includes("find a mechanic") ||
        text.includes("browse mechanics")
    ) {
        button.addEventListener("click", findMechanic);
    } else if (text.includes("become a mechanic")) {
        button.addEventListener("click", becomeMechanic);
    } else if (text.includes("get help")) {
        button.addEventListener("click", getHelp);
    } else if (text.includes("learn more")) {
        button.addEventListener("click", learnMore);
    } else if (text === "sign in") {
        button.addEventListener("click", signIn);
    } else if (
        text.includes("create account") ||
        text.includes("sign up")
    ) {
        button.addEventListener("click", signUp);
    } else if (text.includes("post a job")) {
        button.addEventListener("click", postJob);
    }

    button.dataset.wrenchlinkConnected = "true";
});

updateDashboardNavigation();

});

/* WrenchLink version */

const WRENCHLINK_VERSION = "3.3";

console.log("WrenchLink " + WRENCHLINK_VERSION + " loaded successfully.");
