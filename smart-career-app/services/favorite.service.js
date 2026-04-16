import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export const saveFavorite = async (userId, jobId) => {
  await addDoc(collection(db, "favorites"), {
    userId,
    jobId,
  });
};
