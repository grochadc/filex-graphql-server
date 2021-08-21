const readline = require("readline");

function assert(obj) {
  console.log(Object.keys(obj));
  console.log(Object.entries(obj).map(entry => typeof entry))
}

function parseCsv(stream) {
  const promise = new Promise((resolve, reject) => {
    const lineReader = readline.createInterface({
      input: stream
    });

    let headers = [];
    const applicants = {};
    let lineIndex = 0;

    lineReader.on("line", (line) => {
      const studentArr = line.split(",");
      if (lineIndex === 0) {
        headers = studentArr;
      } else {
        const studentObj = {};
        headers.forEach((header, index) => {
          if (/true/i.test(studentArr[index]) /*studentArr[index] === "TRUE"*/ ) {
            studentObj[header] = true;
          } else if (/false/i.test(studentArr[index]) /*studentArr[index] === "FALSE"*/ ) {
            studentObj[header] = false;
          } else {
            studentObj[header] = studentArr[index];
          }
        });
        applicants[studentObj.codigo] = studentObj;
      }

      lineIndex++;
    });

    lineReader.on("close", () => {
      resolve(applicants);
    });
  });
  return promise;
}

module.exports = {
  parseCsv,
};