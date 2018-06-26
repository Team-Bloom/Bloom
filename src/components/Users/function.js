import { db } from '../../index.js';
import myFirstProject, { firstProjMetaData } from './myFirstProject';

export const addNewUser = async (userObj, email) => {
  try {
    const newProj = myFirstProject(userObj, email);
    const { id } = await db.collection('Projects').add(newProj);
    const metadata = firstProjMetaData(userObj, id);
    await db
      .collection('Users')
      .doc(email)
      .set({
        metadata: userObj,
        projects: {
          [metadata.projectId]: metadata,
        },
      });
  } catch (e) {
    console.error(e);
  }
};

export const searchForUser = async email => {
  try {
    const docRef = db.collection('Users').doc(email);
    const user = await docRef.get();
    return user.exists;
  } catch (error) {
    console.error(error);
  }
};
