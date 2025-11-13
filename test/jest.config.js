/ jest.config.js
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    extensionsToTreatAsEsm: [".js"],
    moduleNameMapper: {
        "^firebase-admin$": "<rootDir>/test/__mocks__/firebase-admin.js",
    },

};
