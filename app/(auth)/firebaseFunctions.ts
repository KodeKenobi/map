import { doc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { db } from "./firebaseConfig"; // Adjust the path to your firebaseConfig file

// Function to get user data from Firestore
export const getUserData = async (uid: string): Promise<any> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid)); // Fetch the user document
    if (userDoc.exists()) {
      console.log("User data:", userDoc.data());
      return userDoc.data(); // Return the user data
    } else {
      console.log("No such user document!");
      return null; // Return null if no document exists
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
