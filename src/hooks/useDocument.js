import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function useDocument(collectionName, documentId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, collectionName, documentId),
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [collectionName, documentId]);

  return { data, loading, error };
}

export default useDocument;
