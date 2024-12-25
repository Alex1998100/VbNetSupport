import { callMySQLProcedure, executeMySQLQuery, pool } from "./Func/mysqlpool.js";

async function getTopics1() {
  const topics = await executeMySQLQuery("SELECT * FROM vbnet.entrance order by i desc;");
  console.log(topics);
  return topics;
}
//working with pool
async function main1() {
  try {
    const topics = await getTopics1(); 
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
main1().catch(console.error); // Handle any errors in the main function