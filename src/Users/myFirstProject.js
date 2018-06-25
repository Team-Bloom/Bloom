const myFirstProject = (userObj, uid) => ({
  metadata: {
    title: 'My First Project',
    owner: uid,
    collaborators: [],
    lastUpdated: '',
  },
  messages: [],
  maps: [
    {
      node: 'first node',
    },
  ],
});

export default myFirstProject;
