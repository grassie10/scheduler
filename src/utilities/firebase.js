import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD0bSk90jamgor7TSKc-7ml3HrA-7JS_BU",
  authDomain: "scheduler-grassie10.firebaseapp.com",
  databaseURL: "https://scheduler-grassie10-default-rtdb.firebaseio.com",
  projectId: "scheduler-grassie10",
  storageBucket: "scheduler-grassie10.appspot.com",
  messagingSenderId: "380978829309",
  appId: "1:380978829309:web:5422cda5b95d88699e6b94"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};