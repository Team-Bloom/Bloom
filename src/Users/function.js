import { db } from "../index.js";

export const addNewUser = async (userObj, uid) => {
  try {
    const newUser = await db
      .collection("Users")
      .doc(uid)
      .set({
        metadata: userObj
      });

    const { id, path } = await db
      .collection("Users")
      .doc(uid)
      .collection("projects")
      .add({ name: "test" });
    console.log(id);
    console.log(path);
    await db
      .collection("Projects")
      .doc(id)
      .set({ name: "test" });
    return { id, path };
  } catch (e) {
    console.error(e);
  }
};
