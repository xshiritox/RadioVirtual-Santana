import { useState, useEffect } from 'react';
import { collection, doc, getDocs, getDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useFirestore = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  const addDocument = async (data: any) => {
    try {
      await addDoc(collection(db, collectionName), data);
      fetchData();
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const updateDocument = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), data);
      fetchData();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return { data, loading, addDocument, updateDocument, deleteDocument, refetch: fetchData };
};