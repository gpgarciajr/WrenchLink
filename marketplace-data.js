/*
 * WRENCHLINK MARKETPLACE DATA
 *
 * Demo marketplace data used until real mechanic accounts
 * populate the marketplace.
 *
 * Distances are displayed in MILES.
 */

const WrenchLinkMarketplace = {

    mechanics: [
        {
            id: "demo-mechanic-001",
            name: "Mike's Mobile Auto",
            email: "demo-mechanic-001@wrenchlink.local",
            phone: "",
            city: "Chicago",
            state: "IL",
            zip: "60601",
            experience: 10,
            rating: 4.9,
            reviews: 38,
            available: true,
            distance: null,
            serviceRadius: 25,
            services: [
                "Diagnostics",
                "Brake Repair",
                "Battery Service",
                "Alternator Repair",
                "Oil Change",
                "General Repair"
            ],
            about:
                "Mobile automotive repair and diagnostics with experience servicing a wide range of vehicles."
        },

        {
            id: "demo-mechanic-002",
            name: "Southside Mobile Mechanic",
            email: "demo-mechanic-002@wrenchlink.local",
            phone: "",
            city: "Chicago",
            state: "IL",
            zip: "60609",
            experience: 8,
            rating: 4.8,
            reviews: 24,
            available: true,
            distance: null,
            serviceRadius: 20,
            services: [
                "Brake Repair",
                "Suspension",
                "Steering",
                "Diagnostics",
                "General Repair"
            ],
            about:
                "Experienced mobile mechanic focused on dependable repairs and honest service."
        },

        {
            id: "demo-mechanic-003",
            name: "Chi-Town Auto Rescue",
            email: "demo-mechanic-003@wrenchlink.local",
            phone: "",
            city: "Chicago",
            state: "IL",
            zip: "60620",
            experience: 12,
            rating: 4.7,
            reviews: 31,
            available: true,
            distance: null,
            serviceRadius: 30,
            services: [
                "Roadside Assistance",
                "Battery Service",
                "Tire Assistance",
                "Fuel Delivery",
                "Vehicle Lockout",
                "Diagnostics"
            ],
            about:
                "Mobile roadside and automotive assistance serving Chicago and surrounding areas."
        },

        {
            id: "demo-mechanic-004",
            name: "Westside Auto Tech",
            email: "demo-mechanic-004@wrenchlink.local",
            phone: "",
            city: "Chicago",
            state: "IL",
            zip: "60612",
            experience: 7,
            rating: 4.6,
            reviews: 19,
            available: false,
            distance: null,
            serviceRadius: 15,
            services: [
                "Diagnostics",
                "Electrical Repair",
                "Alternator Repair",
                "Starter Repair",
                "General Repair"
            ],
            about:
                "Automotive technician specializing in electrical and starting/charging system repairs."
        },

        {
            id: "demo-mechanic-005",
            name: "Northside Mobile Auto",
            email: "demo-mechanic-005@wrenchlink.local",
            phone: "",
            city: "Chicago",
            state: "IL",
            zip: "60614",
            experience: 15,
            rating: 5.0,
            reviews: 47,
            available: true,
            distance: null,
            serviceRadius: 25,
            services: [
                "Brake Repair",
                "Engine Repair",
                "Diagnostics",
                "Maintenance",
                "General Repair"
            ],
            about:
                "Experienced mobile technician providing professional automotive repair and maintenance."
        }
    ]

};


/*
 * Backward-compatible variable.
 * Other pages can use either:
 *
 * WrenchLinkMarketplace.mechanics
 *
 * or:
 *
 * marketplaceMechanics
 */

const marketplaceMechanics = WrenchLinkMarketplace.mechanics;


/*
 * Return a fresh copy so another page cannot accidentally
 * modify the original demo marketplace data.
 */
function getMarketplaceMechanics() {
    return WrenchLinkMarketplace.mechanics.map(function (mechanic) {
        return {
            ...mechanic,
            services: Array.isArray(mechanic.services)
                ? [...mechanic.services]
                : []
        };
    });
}


/*
 * Find one demo mechanic by ID.
 */
function getMarketplaceMechanicById(id) {
    if (!id) return null;

    return WrenchLinkMarketplace.mechanics.find(function (mechanic) {
        return String(mechanic.id) === String(id);
    }) || null;
}
```
