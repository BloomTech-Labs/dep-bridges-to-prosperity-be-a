const db = require('../data/db-config.js');
const Villages = require('../api/villages/villageModel');
const fetch = require('node-fetch');

//This function will rollback and migrate latest and run the village function first
async function main() {
  try {
    const rollback = await db.migrate.rollback();
    const latest = await db.migrate.latest();
    if (rollback.length > 0) {
      console.log('database successfully rolledback');
    }

    if (latest.length > 0) {
      console.log('database successfully latest');
    }
    fetchVillage();
  } catch (err) {
    console.log({ message: err.message });
  }
}
main();

// function to fetch data for villages passed into the main function
async function fetchVillage() {
  const url = await fetch(
    'http://bridges-to-presperity-08272020.eba-3nqy3zpc.us-east-1.elasticbeanstalk.com/villages'
  );

  const data = await url.json();

  let test = null;
  let update = {};
  let newObj = {};
  //Looping through the object recieved which was an object not an array
  for (let i = 0; i < data.length; i++) {
    let newData = data[i];
    for (let newKey in newData) {
      //Database is expecting lower case chars. So looping again to change key chars.
      test = newKey.toLowerCase(); //keys
      let values = newData[newKey];
      newObj[test] = values;
    }

    //destructuring the data recieved from DS
    const {
      vill_id,
      village,
      prov_id,
      province,
      dist_id,
      sect_id,
      sector,
      cell_id,
      status,
      fid,
    } = newObj;
    //Overwriting the keys to match our schema
    update = {
      vill_id,
      name: village,
      prov_id,
      province,
      dist_id,
      sect_id,
      sector,
      cell_id,
      status,
      fid,
    };
    //Adding the data to the database after we have changed it to match our schema
    Villages.add(update)
      .then((data) => console.log('Updating Villages', data))
      .catch((err) => console.log('error', err.message));
  }
}
