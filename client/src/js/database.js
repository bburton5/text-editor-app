import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// DONE: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {
  console.log("GETting all data from the database");

  const jatesDb = await openDB("jate", 1);

  const tx = jatesDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;
};

// DONE: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.log("POSTing to the database");

  const jatesDb = await openDB("jate", 1);

  const tx = jatesDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.put({ id: id, value: value });

  const result = await request;
};

initdb();
