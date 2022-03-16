import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  setDoc,
  deleteDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

let db = null;
let blogPosts = [];

export function init() {
  db = getFirestore();
}
export async function addPost(title, date, summary) {
  const newPost = { title, date, summary };
  try {
    const newFirebasePost = await addDoc(collection(db, "posts"), newPost);
    blogPosts.push({ ...newPost, id: newFirebasePost.id });
    console.log(blogPosts);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

export async function updatePost(index, title, date, summary) {
  // blogPosts[index] = createPost(title, date, summary);
  const originalPost = blogPosts[index];
  const updatedPost = {title, date, summary};
  await setDoc(doc(db, "posts", originalPost.id), updatedPost);
  blogPosts[index] = {
    ...updatedPost,
    id:originalPost.id,
  }
}

export async function deletePost(index) {
  const [deletedDoc] = blogPosts.splice(index, 1);
  deleteDoc(doc(db, "posts", deletedDoc.id));
}

export async function fetchPosts() {
  const docs = await getDocs(collection(db, "posts"));

  docs.forEach((element) => {
    blogPosts.push({ ...element.data(), id: element.id });
  });
  console.log(blogPosts);
}

export async function update(updateView) {
  updateLocalStorage();
  updateView(blogPosts);
}

function updateLocalStorage() {
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
}
