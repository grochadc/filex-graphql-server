class Database {
  db: any;
  constructor(db) {
    this.db = db;
  }
  get(endpoint: string) {
    if (endpoint.endsWith("/"))
      throw new Error("endpoints should end with .json not /");
    const path = endpoint.split("/").filter(item => !(item == ""));
    return this.recursive(this.db, path);
  }
  recursive(obj: any, path: string[]) {
    if (path.length > 0) {
      const currentEndpoint = path.shift();
      //console.log("currentEndpoint", currentEndpoint);
      //console.log("path", path);
      if (currentEndpoint === "") {
        //console.log("found empty slot");
        this.recursive(obj, path);
      }
      if (currentEndpoint.endsWith(".json")) {
        const trimmed = currentEndpoint.substring(
          0,
          currentEndpoint.indexOf(".")
        );
        //console.log("found.json");
        return obj[trimmed];
      }
      if (obj.hasOwnProperty(currentEndpoint)) {
        //console.log("next");
        return this.recursive(obj[currentEndpoint], path);
      } else {
        //console.log("end of path, nothing found, has not hasOwnProperty");
        return null;
      }
    } else {
      //console.log("obj not hasOwnProperty");
      return obj;
    }
  }
}

export default Database;
