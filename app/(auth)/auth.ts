// auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const Register = async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store additional user information in the database
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      phoneNumber,
      // Add any other fields you want to store
    });

    // Fetch and log the user data
    await getUserData(user.uid);
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const Login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      console.log("User data:", userDoc.data());
      return userDoc.data();
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default { Register, Login, Logout, getUserData };
