import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName, orderByCreatedAt = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName) return;

    setLoading(true);
    setError(null);

    const q = orderByCreatedAt
      ? query(collection(db, collectionName), orderBy("createdAt", "desc"))
      : collection(db, collectionName);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Failed to fetch data 😔");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderByCreatedAt]);

  return { data, loading, error };
};
