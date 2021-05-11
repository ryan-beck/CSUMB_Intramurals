import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBbbLZWqoW-xDCdA6bMLzBpc4XOwFIMmuY",
	authDomain: "csumb-intramurals.firebaseapp.com",
	projectId: "csumb-intramurals",
	storageBucket: "csumb-intramurals.appspot.com",
	messagingSenderId: "770652384050",
	appId: "1:770652384050:web:f371993346fd8f213f852b",
	measurementId: "G-MJT38XBHWS"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };