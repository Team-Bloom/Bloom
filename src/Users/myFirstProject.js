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

export const firstProjMetaData = (uid, id) => ({
  title: 'My First Project',
  owner: uid,
  collaborators: [],
  lastUpdated: '',
  projectId: id,
});

export default myFirstProject;
