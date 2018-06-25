import { db } from '../index.js';
import myFirstProject from './myFirstProject';

export const addNewUser = async (userObj, uid) => {
  try {
    const newProj = myFirstProject(userObj, uid);
    const newUser = await db
      .collection('Users')
      .doc(uid)
      .set({
        metadata: userObj,
      });
    console.log(newUser); // should be undefined as Set doesn't return anything
    const { id } = await db
      .collection('Users')
      .doc(uid)
      .collection('projects')
      .add(newProj.metadata);
    console.log(id);
    await db
      .collection('Projects')
      .doc(id)
      .set(newProj);
  } catch (e) {
    console.error(e);
  }
};

export const searchForUser = async uid => {
  try {
    const docRef = db.collection('Users').doc(uid);
    const user = await docRef.get();
    return user.exists;
  } catch (error) {
    console.error(error);
  }
};
