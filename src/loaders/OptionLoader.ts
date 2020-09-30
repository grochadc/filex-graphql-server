const DataLoader = require("dataloader");
const utils = require("../utils");
const db = require("../datasources/db");

const batchOptions = (ids: string[]) => {
  const options = utils.getByIds(db.options, ids);
  const optionMap: { [key: string]: any } = {};
  options.forEach((option) => {
    optionMap[option.id] = option;
  });
  return Promise.resolve(ids.map((id) => optionMap[id]));
};

const optionLoader = () => new DataLoader(batchOptions);

export = optionLoader;
