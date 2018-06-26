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
      text: 'first node',
      left: 50,
      top: 50,
      children: [],
    },
  ],
});

export const firstProjMetaData = (uid, id) => ({
  title: 'My First Project',
  owner: uid,
  collaborators: [],
  lastUpdated: '',
  projectId: id,
});

export default myFirstProject;
