/* =========================================================
WRENCHLINK
MAIN JAVASCRIPT
========================================================= */

/* =========================================================
WRENCHLINK NAVIGATION
========================================================= */

const WrenchLink = {

```
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
GLOBAL FUNCTIONS
These keep older HTML onclick buttons working.
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
BUTTON AUTO-CONNECTION
Handles older buttons that may not have onclick.
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

```
    const buttons =
        document.querySelectorAll(
            "button"
        );


    buttons.forEach(
        function (button) {

            /*
                Don't interfere with buttons that
                already have their own functionality.
            */

            if (
                button.dataset.wrenchlinkConnected ===
                "true"
            ) {
                return;
            }


            const text =
                button.textContent
                    .trim()
                    .toLowerCase();


            if (
                text.includes(
                    "find a mechanic"
                )
            ) {

                button.addEventListener(
                    "click",
                    findMechanic
                );

            }


            else if (
                text.includes(
                    "become a mechanic"
                )
            ) {

                button.addEventListener(
                    "click",
                    becomeMechanic
                );

            }


            else if (
                text.includes(
                    "get help"
                )
            ) {

                button.addEventListener(
                    "click",
                    getHelp
                );

            }


            else if (
                text.includes(
                    "browse mechanics"
                )
            ) {

                button.addEventListener(
                    "click",
                    browseMechanics
                );

            }


            else if (
                text.includes(
                    "learn more"
                )
            ) {

                button.addEventListener(
                    "click",
                    learnMore
                );

            }


            else if (
                text === "sign in" ||
                text.includes("sign in")
            ) {

                button.addEventListener(
                    "click",
                    signIn
                );

            }


            else if (
                text.includes(
                    "create account"
                ) ||
                text.includes(
                    "sign up"
                )
            ) {

                button.addEventListener(
                    "click",
                    signUp
                );

            }


            else if (
                text.includes(
                    "post a job"
                )
            ) {

                button.addEventListener(
                    "click",
                    postJob
                );

            }


            button.dataset.wrenchlinkConnected =
                "true";

        }
    );

}
```

);

/* =========================================================
ACTIVE NAVIGATION
Highlights the current page when possible.
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

```
    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            "nav a"
        );


    navLinks.forEach(
        function (link) {

            const linkPage =
                link
                    .getAttribute("href")
                    ?.split("/")
                    .pop()
                    .split("?")[0]
                    .toLowerCase();


            if (
                linkPage &&
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}
```

);

/* =========================================================
WRENCHLINK STORAGE HELPERS
Foundation for accounts, profiles, jobs,
and dashboards.
========================================================= */

const WrenchLinkStorage = {

```
set: function (key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

},


get: function (key, fallback = null) {

    const value =
        localStorage.getItem(key);


    if (!value) {
        return fallback;
    }


    try {

        return JSON.parse(value);

    }

    catch (error) {

        return fallback;

    }

},


remove: function (key) {

    localStorage.removeItem(key);

},


clear: function () {

    localStorage.clear();

}
```

};

/* =========================================================
CURRENT USER
========================================================= */

function getCurrentUser() {

```
return WrenchLinkStorage.get(
    "wrenchlinkCurrentUser",
    null
);
```

}

function setCurrentUser(user) {

```
WrenchLinkStorage.set(
    "wrenchlinkCurrentUser",
    user
);
```

}

function clearCurrentUser() {

```
WrenchLinkStorage.remove(
    "wrenchlinkCurrentUser"
);
```

}

/* =========================================================
LOGIN STATE
========================================================= */

function isLoggedIn() {

```
return getCurrentUser() !== null;
```

}

/* =========================================================
REQUIRE LOGIN
Can be used by customer/mechanic pages.
========================================================= */

function requireLogin() {

```
if (!isLoggedIn()) {

    window.location.href =
        "login.html";

    return false;

}


return true;
```

}

/* =========================================================
LOGOUT
========================================================= */

function logout() {

```
clearCurrentUser();

window.location.href =
    "index.html";
```

}

/* =========================================================
PAGE REDIRECT HELPER
========================================================= */

function goToPage(page) {

```
window.location.href = page;
```

}

/* =========================================================
WRENCHLINK VERSION
========================================================= */

const WRENCHLINK_VERSION =
"3.0";

/* =========================================================
DEBUG INFORMATION
========================================================= */

console.log(
"WrenchLink " +
WRENCHLINK_VERSION +
" loaded successfully."
);
