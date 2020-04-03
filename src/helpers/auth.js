import { auth } from "../services/firebase";

export const signup = (email, password) => auth().createUserWithEmailAndPassword(email, password);

export const signin = (email, password) => auth().signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => auth().signInWithPopup(new auth.GoogleAuthProvider());

export const signInWithGitHub = () => auth().signInWithPopup(new auth.GithubAuthProvider());

export const logout = () => auth().signOut();

export const userIsSigned = () => auth().currentUser;
