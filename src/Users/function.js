import { db } from '../index.js';

export const addNewUser = async (userObj, id) => {
  try {
    const newUser = await db
      .collection('Users')
      .doc(id)
      .set({
        metadata: userObj,
      });
    console.log(newUser);
    const newProject = await db
      .collection('Users')
      .doc(id)
      .collection('projects')
      .add();
    console.log(newProject);
  } catch (e) {
    console.error(e);
  }
};
