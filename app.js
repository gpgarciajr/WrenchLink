/* =========================================================
WRENCHLINK - MAIN JAVASCRIPT
Navigation, storage, sessions, and shared page helpers
========================================================= */

"use strict";

/* =========================================================
NAVIGATION
========================================================= */

const WrenchLink = {
goTo: function (page) {
window.location.href = page;
},

```
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
    if (mechanicId) {
        this.goTo(
            "mechanic-profile.html?id=" +
            encodeURIComponent(mechanicId)
        );
        return;
    }

    this.goTo("mechanic-profile.html");
}
```

};

/* =========================================================
GLOBAL NAVIGATION FUNCTIONS
Supports existing HTML onclick attributes.
========================================================= */

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

/* =========================================================
SHARED LOCAL STORAGE HELPERS
========================================================= */

const WrenchLinkStorage = {
set: function (key, value) {
try {
localStorage.setItem(key, JSON.stringify(value));
return true;
} catch (error) {
console.error("WrenchLink could not save:", key, error);
return false;
}
},

```
get: function (key, fallback = null) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);
    } catch (error) {
        console.error("WrenchLink could not read:", key, error);
        return fallback;
    }
},

remove: function (key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error("WrenchLink could not remove:", key, error);
        return false;
    }
},

clear: function () {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error("WrenchLink could not clear local storage:", error);
        return false;
    }
}
```

};

/* =========================================================
CURRENT USER SESSION
========================================================= */

function getCurrentUser() {
return WrenchLinkStorage.get("wrenchlinkCurrentUser", null);
}

function setCurrentUser(user) {
if (!user || typeof user !== "object") {
return false;
}

```
return WrenchLinkStorage.set("wrenchlinkCurrentUser", user);
```

}

function clearCurrentUser() {
return WrenchLinkStorage.remove("wrenchlinkCurrentUser");
}

/* =========================================================
LOGIN STATE
========================================================= */

function isLoggedIn() {
return getCurrentUser() !== null;
}

/* =========================================================
REQUIRE LOGIN
========================================================= */

function requireLogin() {
if (!isLoggedIn()) {
window.location.href = "login.html";
return false;
}

```
return true;
```

}

/* =========================================================
LOGOUT
========================================================= */

function logout() {
clearCurrentUser();
window.location.href = "index.html";
}

/* =========================================================
PAGE REDIRECT HELPER
========================================================= */

function goToPage(page) {
if (typeof page === "string" && page.trim() !== "") {
window.location.href = page;
}
}

/* =========================================================
BUTTON AUTO-CONNECTION
Adds navigation only to buttons without existing handlers.
========================================================= */

function connectWrenchLinkButtons() {
const buttons = document.querySelectorAll("button");

```
buttons.forEach(function (button) {
    if (button.dataset.wrenchlinkConnected === "true") {
        return;
    }

    /*
     * Preserve buttons that already have their own behavior.
     */
    if (
        button.hasAttribute("onclick") ||
        button.type === "submit" ||
        button.closest("form")
    ) {
        return;
    }

    const text = button.textContent.trim().toLowerCase();

    let action = null;

    if (text.includes("find a mechanic")) {
        action = findMechanic;
    } else if (text.includes("become a mechanic")) {
        action = becomeMechanic;
    } else if (text.includes("get help")) {
        action = getHelp;
    } else if (text.includes("browse mechanics")) {
        action = browseMechanics;
    } else if (text.includes("learn more")) {
        action = learnMore;
    } else if (text === "sign in" || text === "sign in now") {
        action = signIn;
    } else if (
        text.includes("create account") ||
        text === "sign up"
    ) {
        action = signUp;
    } else if (text.includes("post a job")) {
        action = postJob;
    }

    if (action) {
        button.addEventListener("click", action);
        button.dataset.wrenchlinkConnected = "true";
    }
});
```

}

/* =========================================================
ACTIVE NAVIGATION
========================================================= */

function highlightActiveNavigation() {
const currentPage = window.location.pathname
.split("/")
.pop()
.toLowerCase();

```
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {
    const href = link.getAttribute("href");

    if (!href) {
        return;
    }

    const linkPage = href
        .split("/")
        .pop()
        .split("?")[0]
        .toLowerCase();

    if (linkPage && linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});
```

}

/* =========================================================
INITIALIZE SHARED PAGE FEATURES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
connectWrenchLinkButtons();
highlightActiveNavigation();
});

/* =========================================================
VERSION
========================================================= */

const WRENCHLINK_VERSION = "3.1";

console.log("WrenchLink " + WRENCHLINK_VERSION + " loaded successfully.");
