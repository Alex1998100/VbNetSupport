import { callMySQLProcedure, executeMySQLQuery, pool } from "./Func/mysqlpool.js";
import { connect, disConnect, execMySQLQuery } from "./Func/mysql.js";
import { Connect as pgConnect, disConnect as pgDisConnect, Select as pgSelect, Insert as pgInsert } from "./Func/postgres.js";
import { pgPoolProcedure, pgPoolQuery, pool as pgPool } from "./Func/postgrespool.js";

async function getTopics1() {
  const topics = await executeMySQLQuery("SELECT * FROM vbnet.entrance order by i desc;");
  console.log(topics);
  return topics;
}
//working with pool
async function main1() {
  try {
    const topics = await getTopics1(); // Call your database function
  } finally {
    // Ensure the pool is closed even if there's an error
    pool.end((err) => {
      // Callback to handle potential errors during closing
      if (err) {
        console.error("Error closing MySQL pool:", err);
      } else {
        console.log("MySQL pool closed successfully.");
      }
    });
  }
}
// main1().catch(console.error); // Handle any errors in the main function

//working without pool
async function getTopics2() {
  const topics = await execMySQLQuery("SELECT * FROM vbnet.entrance order by i desc;");
  console.log(topics);
  return topics;
}

let topics;
let mysqlConnectionEstablished = false; // Flag to track MySQL connection status  or we receive multiple times 'Error closing MySQL connection: Error: Cannot enqueue Quit after invoking quit."
async function main2() {
  try {
    if (!mysqlConnectionEstablished) {
      connect();
      mysqlConnectionEstablished = true;
    }
    topics = await getTopics2();
  } finally {
    if (mysqlConnectionEstablished) {
      disConnect();
      mysqlConnectionEstablished = false;
    }
  }
}

let pgDb;
async function pgInsertOperations(i, id, crdate, type, url, txt, tags) {
  try {
    await pgInsert(pgDb, `INSERT INTO public.entrance(i, id, crdate, type, url, txt, tags) VALUES ('${i}', '${id}', '${crdate}', '${type}', '${url}', '${txt}', '${tags}');`);
  } finally {
    //await pgDisConnect(pgDb);
  }
}

async function pgPoolOperation() {
  try {
    const result = await new Promise((resolve, reject) => {
      pgPoolQuery("SELECT * FROM public.entry WHERE i > 164608 ORDER BY i", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    console.log(result);
  } finally {
    await pgPool.end();
    console.log("PostgreSQL pool closed");
  }
}

async function runAllOperations() {
  try {
    await main2().catch(console.error);
    pgDb = await pgConnect();
    await Promise.all(topics.map((x) => pgInsertOperations(x.i, x.ID, x.CrDate.toISOString(), x.Type, x.URL, x.TXT.replaceAll("'", "''"), x.Tags)));
  } catch (error) {
    console.error("Error in runAllOperations:", error);
  } finally {
    if (pgDb) {
      await pgDisConnect(pgDb);
      console.log("PostgreSQL connection closed");
    }
  }
}

runAllOperations()
  .then(() => {
    console.log("All database operations completed.");
  })
  .catch((error) => {
    console.error("Main error:", error);
  });
