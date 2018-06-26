const myFirstProject = (userObj, email) => ({
  metadata: {
    title: 'My First Project',
    owner: email,
    collaborators: [{ name: userObj.name, email: email }],
    lastUpdated: '',
  },
  messages: [],
  maps: [
    {
      text: 'first node',
      left: 50,
      top: 50,
      children: [],
    },
  ],
});

export const firstProjMetaData = (userObj, id) => ({
  title: 'My First Project',
  owner: userObj.email,
  collaborators: [{ name: userObj.name, email: userObj.email }],
  lastUpdated: '',
  projectId: id,
});

export default myFirstProject;
