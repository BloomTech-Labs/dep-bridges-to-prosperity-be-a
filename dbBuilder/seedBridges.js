const db = require('../data/db-config.js');
const Bridge = require('../api/bridges/bridgeModal');
const fetch = require('node-fetch');

//This function will rollback and migrate latest and run the village function first
async function main() {
  try {
    fetchBridges();
  } catch (err) {
    console.log({ message: err.message });
  }
}

main();

// function to fetch data for bridges passed into the main function
async function fetchBridges() {
  const url = await fetch(
    'http://bridges-to-presperity-08272020.eba-3nqy3zpc.us-east-1.elasticbeanstalk.com/sites'
  );
  const data = await url.json();

  let test = null;
  let update = {};
  let newObj = {};
  //Looping through the object recieved which was an object not an array
  for (let i = 0; i < data.length; i++) {
    let newData = data[i];
    for (let newKey in newData) {
      //Database is expecting lower case chars.
      //So looping again to change key chars and remove empty space and to lower case
      test = newKey.toLowerCase().split(' ').join('');
      let values = newData[newKey];
      newObj[test] = values;
    }

    //Creating variable to allow to override the keys
    const sub_stage = newObj['projectsub-stage'];
    const span = newObj['span(m)'];
    const latitude = newObj['gps(latitude)'];
    const longitude = newObj['gps(longitude)'];
    const form_name = newObj['form:formname'];
    const com1 = newObj['communityserved1'];
    const com2 = newObj['communityserved2'];
    const com3 = newObj['communityserved3'];
    const com4 = newObj['communityserved4'];
    const com5 = newObj['communityserved5'];
    const commArray = [com1, com2, com3, com4, com5];
    const bridge_opportunity_id = newObj['bridgeopportunity:opportunityid'];
    //Destructuring the data recieved
    const {
      projectcode,
      bridgesitename,
      bridgetype,
      individualsdirectlyserved,
      country,
      province,
      district,
      sector,
      cell,
      casesafeidform,
      projectstage,
    } = newObj;
    //Overwriting the keys to match our database schema
    update = {
      project_code: projectcode,
      name: bridgesitename,
      type: bridgetype,
      sub_stage,
      span,
      latitude,
      longitude,
      form_name,
      bridge_opportunity_id,
      case_safe_id_form: casesafeidform,
      individuals_directly_served: individualsdirectlyserved,
      country,
      province,
      district,
      sector,
      cell,
      stage: projectstage,
    };
    //Adding the changed data that matches the schema to the database
    Bridge.add(update)
      .then((bridge) => {
        console.log('Upding bridges', bridge);
      })
      .catch((err) => console.log('error', err.message));
    //Looping over the communities array from villages
    //return the object with that village name if it matches
    commArray.forEach(async (villageName) => {
      try {
        const village = await db('villages')
          .where({ name: villageName })
          .first();
        //Looking on the bridge table
        //Return bridge object where project_code matches projectcode
        const bridge = await db('bridges')
          .where({ project_code: projectcode })
          .first();
        //We insert bridge and village ids into the communities served table
        const insertertedData = await db('communities_served').insert({
          bridge_id: bridge.id,
          village_id: village.id,
        });
        //check to see if insertertedData is empty or not and log the correct response.
        insertertedData === 0
          ? console.log('Relationship between bridge and village not found')
          : console.log('added successfully!');
      } catch (err) {
        console.log(
          'there was an error inserting into communities_served',
          err.message
        );
      }
    });
  }
}
