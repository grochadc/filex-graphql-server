const { parseCsv } = require("./csvParser");
const fs = require("fs");
const source = fs.createReadStream("data/masterlist.csv");

async function main() {
  const csv = await parseCsv(source);
  let data = {
    students: csv,
  };
  fs.writeFile("./db.json", JSON.stringify(data, null, 2), () =>
    console.log("File written")
  );
}

main();
