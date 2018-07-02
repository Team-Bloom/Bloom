import { db } from '../exports.js'
export const addNewUser = async (userObj, uid) => {
  try {
    await db
      .collection('Users')
      .doc(uid)
      .set({
        metadata: userObj
      });

    const { id, path } = await db
      .collection('Users')
      .doc(uid)
      .collection('projects')
      .add({ name: 'test' });

    await db
      .collection('Projects')
      .doc(id)
      .set({ name: 'test' });
    return { id, path };
} catch (err) {
    console.error(err);
  }
};
