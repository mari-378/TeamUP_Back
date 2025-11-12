const store = { collections: {} };

function getCollection(name) {
  if (!store.collections[name]) store.collections[name] = new Map();
  return store.collections[name];
}

export default {
  apps: [],
  initializeApp: jest.fn(() => {
    if (!module.exports.apps) module.exports.apps = [{}];
    return {};
  }),
  credential: {
    cert: jest.fn(() => ({}))
  },
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn(async (token) => {
      if (token === "valid-token") return { uid: "uid-test", email: "user@test.com" };
      throw new Error("invalid token");
    }),
    createUser: jest.fn(async ({ email }) => ({ uid: "uid-test", email }))
  })),
  firestore: jest.fn(() => ({
    collection: (name) => {
      const col = getCollection(name);
      return {
        add: async (doc) => {
          const id = `${col.size + 1}`;
          col.set(id, { ...doc });
          return { id };
        },
        doc: (id) => ({
          set: async (data) => col.set(id, data),
          delete: async () => col.delete(id)
        }),
        orderBy: () => ({
          get: async () => ({
            docs: Array.from(col.entries()).map(([id, data]) => ({
              id,
              data: () => data
            }))
          })
        }),
        get: async () => ({
          docs: Array.from(col.entries()).map(([id, data]) => ({
            id,
            data: () => data
          }))
        })
      };
    }
  }))
};

export const apps = [];
export const initializeApp = module.exports?.initializeApp || (() => {});
export const credential = { cert: jest.fn(() => ({})) };
export const auth = () => ({
  verifyIdToken: jest.fn(async (token) => {
    if (token === "valid-token") return { uid: "uid-test", email: "user@test.com" };
    throw new Error("invalid token");
  }),
  createUser: jest.fn(async ({ email }) => ({ uid: "uid-test", email }))
});
export const firestore = () => ({
  collection: (name) => {
    const col = getCollection(name);
    return {
      add: async (doc) => {
        const id = `${col.size + 1}`;
        col.set(id, { ...doc });
        return { id };
      },
      doc: (id) => ({
        set: async (data) => col.set(id, data),
        delete: async () => col.delete(id)
      }),
      orderBy: () => ({
        get: async () => ({
          docs: Array.from(col.entries()).map(([id, data]) => ({
            id,
            data: () => data
          }))
        })
      }),
      get: async () => ({
        docs: Array.from(col.entries()).map(([id, data]) => ({
          id,
          data: () => data
        }))
      })
    };
  }
});
