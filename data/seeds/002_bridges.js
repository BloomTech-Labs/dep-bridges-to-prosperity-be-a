exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('bridges')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('bridges').insert([
        {
          id: 1014107,
          name: 'Buzi',
          type: 'Suspended',
          stage: 'Rejected',
          subStage: 'Technical',
          individualsDirectlyServed: 0.0,
          span: 0.0,
          latitude: -2.42056,
          longitude: 28.9662,
        },
        {
          id: 1014106,
          name: 'Kamigisha',
          type: 'Suspended',
          stage: 'Rejected',
          subStage: 'Technical',
          individualsDirectlyServed: 0.0,
          span: 0.0,
          latitude: -2.42486,
          longitude: 28.95726,
        },
        {
          id: 1007651,
          name: 'Gipfundo',
          type: 'Suspended',
          stage: 'Rejected',
          subStage: 'Technical',
          individualsDirectlyServed: 0.0,
          span: 8.0,
          latitude: -1.72053,
          longitude: 30.08124,
        },
        {
          id: 1012493,
          name: 'Nyarubande',
          type: 'Other',
          stage: 'Rejected',
          subStage: 'NaN',
          individualsDirectlyServed: 0.0,
          span: 0.0,
          latitude: -1.65595,
          longitude: 30.07884,
        },
        {
          id: 1014318,
          name: 'Kirwa',
          type: 'Suspended',
          stage: 'Identidied',
          subStage: 'Requested',
          individualsDirectlyServed: 0.0,
          span: 0.0,
          latitude: -1.870868,
          longitude: 29.877686,
        },
      ]);
    });
};
