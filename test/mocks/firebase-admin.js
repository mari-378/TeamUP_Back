// test/__mocks__/firebase-admin.js
const firestoreMock = {
    collection: jest.fn(() => ({
        doc: jest.fn(() => ({
            set: jest.fn(),
            get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
            update: jest.fn(),
            delete: jest.fn(),
        })),
        add: jest.fn(() => Promise.resolve({ id: "mockId" })),
        where: jest.fn(() => ({
            get: jest.fn(() => Promise.resolve({ docs: [] })),
        })),
    })),
};

export default {
    initializeApp: jest.fn(),
    credential: {
        cert: jest.fn(() => ({})),
    },
    firestore: jest.fn(() => firestoreMock),
};