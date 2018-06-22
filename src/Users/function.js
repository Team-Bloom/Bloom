export const add = async () => {
  try {
    const newUser = await db.collection("Users").add({metadata: {
      first: "Test3",
      last: "tester",
      email: "test@test.com"
    }})
    await newUser.collection('projects').add({
      name: 'test'
    });
  } catch (e) {
    console.error(e);
  }
};

