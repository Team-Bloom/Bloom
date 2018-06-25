import { db } from '../index.js';

export const addNewUser = async (userObj, uid) => {
  try {
    const newUser = await db
      .collection('Users')
      .doc(uid)
      .set({
        metadata: userObj,
      });
    console.log(newUser);
    const { id } = await db
      .collection('Users')
      .doc(uid)
      .collection('projects')
      .add({ name: 'test' });
    console.log(id);
    await db
      .collection('Projects')
      .doc(id)
      .set({ name: 'test' });
  } catch (e) {
    console.error(e);
  }
};

