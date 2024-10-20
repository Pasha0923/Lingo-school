import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import toast from "react-hot-toast";
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      toast.success("You have successfully signed in", {
        style: {
          backgroundColor: "#38CD3E",
          color: "#fff",
          padding: "16px",
          fontSize: "18px",
        },
      });

      return { uid: user.uid, email: user.email, name: user.displayName };
    } catch (error) {
      toast.success(error.message || "Something went wrong", {
        style: {
          backgroundColor: "red",
          color: "#fff",
          padding: "16px",
          fontSize: "18px",
        },
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      toast.success("You have successfully signed in", {
        style: {
          backgroundColor: "#38CD3E",
          color: "#fff",
          padding: "16px",
          fontSize: "18px",
        },
      });

      return { uid: user.uid, email: user.email, name: user.displayName };
    } catch (error) {
      toast.success(error.message || "Something went wrong", {
        style: {
          backgroundColor: "red",
          color: "#fff",
          padding: "16px",
          fontSize: "18px",
        },
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      toast.success(error.message || "Something went wrong", {
        style: {
          backgroundColor: "red",
          color: "#fff",
          padding: "16px",
          fontSize: "18px",
        },
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const serializedUser = {
              uid: user.uid,
              email: user.email,
              name: user.displayName,
            };

            resolve(serializedUser);
          } else {
            reject(new Error("User not authentificated"));
          }
        });
      });
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
