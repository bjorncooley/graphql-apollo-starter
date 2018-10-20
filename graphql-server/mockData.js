const user1 = {
  email: 'user1@example.com',
  firstName: 'Jean-Luc',
  id: 1,
  isActive: true,
  lastName: 'Gray',
  password: 'speakfriend',
};

const user2 = {
  email: 'user2@example.com',
  firstName: 'Mary',
  id: 2,
  isActive: true,
  lastName: 'Troy',
  password: 'whichprime',
};

const user3 = {
  email: 'user3@example.com',
  firstName: 'William',
  id: 3,
  isActive: false,
  lastName: 'Potter',
  password: 'goboldly',
};

const user4 = {
  email: 'user4@example.com',
  firstName: 'Sam',
  id: 4,
  isActive: false,
  lastName: 'Crusher',
  password: 'digitalwatches',
};

const userList = [
  user1,
  user2,
  user3,
]

const userGroup1 = {
  id: 321,
  displayName: "First User Group",
  users: [user1,user3,user4],
}

const userGroup2 = {
  id: 213,
  displayName: "Second User Group",
  users: [user2],
}

const userGroupList = [
  userGroup1,
  userGroup2
]

module.exports = { userGroupList, userList };
