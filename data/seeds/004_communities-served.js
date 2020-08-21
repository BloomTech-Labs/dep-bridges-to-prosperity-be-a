exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('communities_served')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('communities_served').insert([
        { bridge_id: 1, village_id: 1 },
        { bridge_id: 1, village_id: 2 },
        { bridge_id: 1, village_id: 3 },
        { bridge_id: 1, village_id: 4 },
        { bridge_id: 1, village_id: 5 },
        { bridge_id: 1, village_id: 6 },
        { bridge_id: 1, village_id: 7 },
        { bridge_id: 1, village_id: 8 },
        { bridge_id: 2, village_id: 9 },
        { bridge_id: 2, village_id: 10 },
        { bridge_id: 2, village_id: 11 },
        { bridge_id: 2, village_id: 12 },
        { bridge_id: 4, village_id: 13 },
        { bridge_id: 4, village_id: 13 },
        { bridge_id: 4, village_id: 15 },
        { bridge_id: 4, village_id: 16 },
        { bridge_id: 3, village_id: 17 },
        { bridge_id: 3, village_id: 18 },
        { bridge_id: 3, village_id: 19 },
        { bridge_id: 3, village_id: 1 },
        { bridge_id: 5, village_id: 12 },
        { bridge_id: 5, village_id: 2 },
        { bridge_id: 5, village_id: 1 },
        { bridge_id: 5, village_id: 11 },
      ]);
    });
};
