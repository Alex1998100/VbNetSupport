import pg from "pg";
import {} from "dotenv/config";
//localPostgresCN="postgres://xxxxxx:yyyyyyy@localhost:5432/VbNetOnGoogleDisk"
export function Connect() {
  const { Client } = pg;
  let pgConnect = process.env.localPostgresCN;
  let client = new Client(pgConnect);

  client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL database");
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });
  return client;
}

export async function disConnect(client) {
 return await client
    .end()
    .then(() => {
      console.log("Connection to PostgreSQL closed");
    })
    .catch((err) => {
      console.error("Error closing connection", err);
    });
}

export async function Select(client, select, selectCallback) {
  return await client.query(select).then(async (x) => {
      selectCallback(x.rows);
  });
}

let iCallback = async (result, sql) => {
  console.log(result, sql);
};
export async function Insert(client, insert, insertCallback=iCallback) {
  return await client.query(insert).then(async (x) => {
    insertCallback(x.rowCount, insert);
  });
}


//example
//import { Connect as pgConnect, disConnect as pgDisConnect, Select as pgSelect, Insert as pgInsert } from "./Func/postgres.js";

async function pgOperations() {
  const pgDb = pgConnect();
  try {
    const result = await new Promise((resolve, reject) => {
      // Promisify pgSelect
      pgSelect(pgDb, "SELECT * FROM public.entry WHERE i > 164608 ORDER BY i", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.log(result); // Log the results *after* the promise resolves
  } finally {
    pgDisConnect(pgDb); // Disconnect in the finally block
  }
}

Promise.all([
  pgOperations().catch(console.error), // all PostgreSQL operations
]).then(() => {
  console.log("All database operations completed."); // Optional logging
});
