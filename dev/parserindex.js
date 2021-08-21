const {
  parseCsv
} = require("./csvParser");
const fs = require("fs");
const source = fs.createReadStream("../data/final21B.csv");

async function main() {
  const csv = await parseCsv(source);
  let data = csv;
  fs.writeFile("../data/applicants21B.json", JSON.stringify(data, null, 2), () =>
    console.log("File written")
  );
}

main();