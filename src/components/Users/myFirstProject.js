const myFirstProject = (userObj, email, title) => ({
  metadata: {
    title: title,
    owner: email,
    collaborators: [{ name: userObj.name, email: email }],
    lastUpdated: '',
  },
  messages: [],
  history: [
    {
      version: [
        {
          text: 'first node',
          left: 250,
          top: 50,
          children: [],
        },
      ],
    },
  ],
  forward: [],
  maps: [
    {
      text: 'first node',
      left: 250,
      top: 250,
      children: [],
    },
  ],
});

export const firstProjMetaData = (userObj, id, title) => ({
  title: title,
  owner: userObj.email,
  collaborators: [{ name: userObj.name, email: userObj.email }],
  lastUpdated: '',
  projectId: id,
});

export default myFirstProject;
