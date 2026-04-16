import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export const getJobs = async () => {
  const snapshot = await getDocs(collection(db, "jobs"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
