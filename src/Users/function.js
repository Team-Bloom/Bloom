import { db } from '../index.js';
import myFirstProject, { firstProjMetaData } from './myFirstProject';

export const addNewUser = async (userObj, uid) => {
  try {
    const newProj = myFirstProject(userObj, uid);
    const { id } = await db.collection('Projects').add(newProj);
    console.log(id);
    const metadata = firstProjMetaData(uid, id);
    await db
      .collection('Users')
      .doc(uid)
      .set({
        metadata: {...userObj,uid},
        projects: [metadata],
      });
  } catch (e) {
    console.error(e);
  }
};

export const searchForUser = async uid => {
  try {
    const docRef = db.collection('Users').doc(uid);
    const user = await docRef.get();
    console.log("line 26 in function JS: USER", user.data())
    return user.exists;
  } catch (error) {
    console.error(error);
  }
};
