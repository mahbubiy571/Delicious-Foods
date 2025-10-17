import { useState } from "react";
import { auth, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { getFirebaseErrorMessage } from "../components/ErrorId";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const useGoogle = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const googleProvider = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPending(true);
      const req = await signInWithPopup(auth, provider);

      if (!req.user) {
        throw new Error("Registration failed");
      }

      const userRef = doc(db, "users", req.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: req.user.uid,
          displayName: req.user.displayName,
          email: req.user.email,
          photoURL: req.user.photoURL,
          providerId: req.user.providerData[0]?.providerId || "unknown",
          emailVerified: req.user.emailVerified,
          online: true,
        });
      } else {
        await updateDoc(userRef, {
          displayName: req.user.displayName,
          email: req.user.email,
          photoURL: req.user.photoURL,
          providerId: req.user.providerData[0]?.providerId || "unknown",
          emailVerified: req.user.emailVerified,
          online: true,
        });
      }

      dispatch(login(req.user));

      toast.success("Google orqali kirdingiz!");
    } catch (error) {
      const errMsg = getFirebaseErrorMessage(error.message);
      setError(errMsg);
      console.log(error.message);

      toast.error(errMsg);
    } finally {
      setIsPending(false);
    }
  };

  return { googleProvider, isPending, error };
};
