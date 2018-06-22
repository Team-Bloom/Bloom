export const add = async userObj => {
  try {
    const newUser = await db.collection('Users').add({
      metadata: userObj,
    });
    await newUser.collection('projects').add({
      name: 'test',
    });
  } catch (e) {
    console.error(e);
  }
};
