const fakeData = [
  {
    id: 1,
    name: "João Oliveira",
    job: "Desenvolvedor",
    readsCounter: 0,
  },
];

let lastUserId = 1;

const sessions = [{ id: 1, userId: 1 }];

let lastSessionId = 1;

module.exports = { fakeData, lastUserId, sessions, lastSessionId };
