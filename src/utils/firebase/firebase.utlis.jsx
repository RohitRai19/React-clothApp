import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged

} from "firebase/auth";
import { getFirestore, doc, getDoc,getDocs, setDoc,collection,writeBatch, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfdfPyvuHKKFsZhsmW0bQQIhqaNWbY08w",
  authDomain: "rai-clothing-db.firebaseapp.com",
  projectId: "rai-clothing-db",
  storageBucket: "rai-clothing-db.appspot.com",
  messagingSenderId: "25540534025",
  appId: "1:25540534025:web:e17c1ceb8d955499a5fdd8"
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
    
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments =async()=>{
  const collectionRef =collection(db,'categories');
  const q = query(collectionRef);

const querySnapshot = await getDocs(q);
return querySnapshot.docs.map((docSnapshot)=>docSnapshot.data())
// .reduce((acc,docSnapshot)=>{
//   const {title,items}=docSnapshot.data();
//   acc[title.toLowerCase()]=items;
//   return acc;
// },{});

// return categoryMap;

}



export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  if(!userAuth) return;
  const userDocRef = doc(db,'user', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      switch(error.code){
        case 'auth/wrong-password':alert('incorrect password for email');
        break;
        case 'auth/user-not-found':alert('no user associated  with this email');
        break;
        default:
          console.log(error);
      }
   
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email,password)=>{
if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password);
};
export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return;
   return await signInWithEmailAndPassword(auth,email,password);

  };
  
  export const signOutUser = async()=> await signOut(auth);

  export const onAuthStateChangedListener = (callback)=> onAuthStateChanged (auth,callback);