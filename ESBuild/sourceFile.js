// Import necessary functions from Firebase SDKs. These support offline functionality.
//import { initializeApp, getApps, deleteApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
//import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
//import { getFirestore, collection, query ,onSnapshot, doc, getDoc, arrayUnion, arrayRemove, updateDoc, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, clearIndexedDbPersistence, waitForPendingWrites, terminate } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Import necessary functions from Firebase SDKs. These do not support offline functionality.
import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, arrayUnion, arrayRemove, updateDoc, initializeFirestore, terminate } from "firebase/firestore";

// const functionsArray = [ initializeApp, getApps, deleteApp, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, getFirestore, collection, doc, getDoc, arrayUnion, arrayRemove, updateDoc, initializeFirestore, terminate ];

window.initializeApp = initializeApp;
window.getApps = getApps;
window.deleteApp = deleteApp;
window.getAuth = getAuth;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.onAuthStateChanged = onAuthStateChanged;
window.signOut = signOut;
window.getFirestore = getFirestore;
window.collection = collection;
window.doc = doc;
window.getDoc = getDoc;
window.arrayUnion = arrayUnion;
window.arrayRemove = arrayRemove;
window.updateDoc = updateDoc;
window.initializeFirestore = initializeFirestore;
window.terminate = terminate;
