import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export const applyJob = async (userId, jobId) => {
  await addDoc(collection(db, "applications"), {
    userId,
    jobId,
    status: "pending",
    createdAt: new Date(),
  });
};
