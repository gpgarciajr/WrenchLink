/*
    WrenchLink Marketplace Data
    ----------------------------
    Shared marketplace data and functions.

    This is currently a front-end/demo data layer.
    Later, this file can be replaced with database/API
    calls without rebuilding the marketplace pages.
*/

const WRENCHLINK_MARKETPLACE_KEY =
    "wrenchlinkMarketplaceMechanics";

const WRENCHLINK_REVIEWS_KEY =
    "wrenchlinkReviews";


const WRENCHLINK_DEMO_MECHANICS = [

    {
        id: "mechanic-1",

        name: "Mike's Mobile Auto",

        email: "mike@example.com",

        phone: "",

        city: "Chicago",

        state: "IL",

        zip: "60618",

        radius: 25,

        experience: 12,

        services: [
            "Brakes & Rotors",
            "Battery",
            "Alternator",
            "Starter",
            "Diagnostics"
        ],

        rating: 4.9,

        reviewCount: 47,

        available: true,

        about:
            "Experienced mobile mechanic providing dependable repairs at your location.",

        distance: 3.2

    },

    {
        id: "mechanic-2",

        name: "Southside Mobile Mechanics",

        email: "southside@example.com",

        phone: "",

        city: "Chicago",

        state: "IL",

        zip: "60620",

        radius: 20,

        experience: 8,

        services: [
            "Battery",
            "Alternator",
            "Starter",
            "Oil Change",
            "Diagnostics"
        ],

        rating: 4.8,

        reviewCount: 31,

        available: true,

        about:
            "Mobile repair service focused on diagnostics and common mechanical repairs.",

        distance: 7.6

    },

    {
        id: "mechanic-3",

        name: "Chicago Roadside Pro",

        email: "roadside@example.com",

        phone: "",

        city: "Chicago",

        state: "IL",

        zip: "60632",

        radius: 30,

        experience: 10,

        services: [
            "Roadside Assistance",
            "Battery",
            "Tire Assistance",
            "Lockout",
            "Fuel Delivery"
        ],

        rating: 4.7,

        reviewCount: 28,

        available: false,

        about:
            "Roadside and mobile assistance throughout the Chicago area.",

        distance: 10.4

    },

    {
        id: "mechanic-4",

        name: "Garcia Mobile Repair",

        email: "garcia@example.com",

        phone: "",

        city: "Chicago",

        state: "IL",

        zip: "60629",

        radius: 25,

        experience: 10,

        services: [
            "Brakes & Rotors",
            "Battery",
            "Alternator",
            "Starter",
            "Diagnostics",
            "Oil Change",
            "Tire Assistance",
            "Other Repairs"
        ],

        rating: 5.0,

        reviewCount: 19,

        available: true,

        about:
            "Professional mobile repair service focused on convenient repairs at the customer's location.",

        distance: 5.1

    }

];


/*
    Get the marketplace mechanics.
*/
function getMarketplaceMechanics() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                WRENCHLINK_MARKETPLACE_KEY
            )
        );

    if (
        Array.isArray(saved) &&
        saved.length
    ) {

        return saved;

    }

    return buildMarketplaceMechanics();

}


/*
    Build marketplace list.

    If a mechanic profile has been created
    on this browser, it becomes a marketplace
    mechanic automatically.
*/
function buildMarketplaceMechanics() {

    const mechanics = [
        ...WRENCHLINK_DEMO_MECHANICS
    ];

    const profile =
        JSON.parse(
            localStorage.getItem(
                "wrenchlinkMechanicProfile"
            )
        );

    const area =
        JSON.parse(
            localStorage.getItem(
                "wrenchlinkServiceArea"
            )
        );

    if (
        profile &&
        profile.name
    ) {

        let services = [];

        if (profile.services) {

            services =
                profile.services
                    .split(",")
                    .map(function(service) {
                        return service.trim();
                    })
                    .filter(Boolean);

        }

        const personalMechanic = {

            id: "local-mechanic",

            name: profile.name,

            email: profile.email || "",

            phone: profile.phone || "",

            city:
                area?.city ||
                "Chicago",

            state:
                area?.state ||
                "IL",

            zip:
                area?.zip ||
                "",

            radius:
                Number(area?.radius) ||
                25,

            experience:
                Number(profile.experience) ||
                0,

            services:
                services.length
                    ? services
                    : [
                        "Diagnostics",
                        "Battery",
                        "Alternator",
                        "Starter",
                        "Other Repairs"
                    ],

            rating: 5.0,

            reviewCount: 0,

            available: true,

            about:
                profile.about ||
                "WrenchLink mobile mechanic.",

            distance: 0

        };

        mechanics.unshift(
            personalMechanic
        );

    }

    return mechanics;

}


/*
    Find a mechanic by ID.
*/
function getMechanicById(id) {

    const mechanics =
        getMarketplaceMechanics();

    return mechanics.find(
        function(mechanic) {
            return mechanic.id === id;
        }
    );

}


/*
    Get reviews for a mechanic.
*/
function getMechanicReviews(
    mechanicId
) {

    const reviews =
        JSON.parse(
            localStorage.getItem(
                WRENCHLINK_REVIEWS_KEY
            )
        ) || [];

    return reviews.filter(
        function(review) {

            return (
                review.mechanicId ===
                mechanicId
            );

        }
    );

}


/*
    Calculate the current rating.
*/
function calculateMechanicRating(
    mechanic
) {

    const reviews =
        getMechanicReviews(
            mechanic.id
        );

    if (!reviews.length) {

        return {
            rating: mechanic.rating || 0,
            count: mechanic.reviewCount || 0
        };

    }

    let total = 0;

    reviews.forEach(
        function(review) {

            total +=
                Number(review.rating) || 0;

        }
    );

    return {

        rating:
            total / reviews.length,

        count:
            reviews.length +
            (mechanic.reviewCount || 0)

    };

}


/*
    Save marketplace data.
*/
function saveMarketplaceMechanics(
    mechanics
) {

    localStorage.setItem(
        WRENCHLINK_MARKETPLACE_KEY,
        JSON.stringify(mechanics)
    );

}


/*
    Escape HTML.
*/
function escapeMarketplaceHTML(
    value
) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/*
    Render stars.
*/
function renderMechanicStars(
    rating
) {

    const rounded =
        Math.round(
            Number(rating) || 0
        );

    return "★".repeat(rounded) +
        "☆".repeat(
            Math.max(
                0,
                5 - rounded
            )
        );

}


/*
    Save a job request.
*/
function saveWrenchLinkJob(
    job
) {

    const jobs =
        JSON.parse(
            localStorage.getItem(
                "wrenchlinkJobs"
            )
        ) || [];

    jobs.unshift(job);

    localStorage.setItem(
        "wrenchlinkJobs",
        JSON.stringify(jobs)
    );

}


/*
    Get all jobs.
*/
function getWrenchLinkJobs() {

    return (
        JSON.parse(
            localStorage.getItem(
                "wrenchlinkJobs"
            )
        ) || []
    );

}


/*
    Find the selected mechanic
    from the URL.
*/
function getRequestedMechanicFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const mechanicId =
        params.get("mechanic");

    if (!mechanicId) {

        return null;

    }

    return getMechanicById(
        mechanicId
    );

}
