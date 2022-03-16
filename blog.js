import { customPrompt, confirm } from "./customdialog.js";
import {
  addPost,
  deletePost,
  updatePost,
  update,
  fetchPosts,
  init,
} from "./blog-firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
//import { firestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyJAM7O8TX25-Fxhn1xXFbBklooqKFAHk",
  authDomain: "ajax-7e34d.firebaseapp.com",
  projectId: "ajax-7e34d",
  storageBucket: "ajax-7e34d.appspot.com",
  messagingSenderId: "38650875366",
  appId: "1:38650875366:web:b477c5be422eb3f4325a27",
  measurementId: "G-BTX86988SV",
};

// Initialize Firebase
initializeApp(firebaseConfig);
init();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    username.textContent = user.email;
    loginBtn.classList.add("hidden");
    logOutBtn.classList.remove("hidden");
  }
});
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    username.textContent = user.email;
    loginBtn.classList.add("hidden");
    logOutBtn.classList.remove("hidden");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}
async function logOut() {
  try {
    await signOut(auth);
    username.textContent = "";
    loginBtn.classList.remove("hidden");
    logOutBtn.classList.add("hidden");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

const postTemplate = () =>
  document.getElementById("post-template").content.cloneNode(true);
const postList = document.getElementById("post-list");
const openAdd = document.getElementById("open-add");
const loginBtn = document.getElementById("login-btn");
const logOutBtn = document.getElementById("logout-btn");
const username = document.getElementById("username");

loginBtn.addEventListener("click", () => {
  customPrompt(
    "login",
    () => {},
    (dialog) => {
      if (!dialog) {
        return;
      }
      const email = dialog.querySelector("#login-email").value;
      const password = dialog.querySelector("#login-password").value;
      login(email, password);
    }
  );
});

logOutBtn.addEventListener("click", logOut);

openAdd.addEventListener("click", () => {
  customPrompt(
    "add-post",
    (dialog) => {},
    async (dialog) => {
      if (!dialog) {
        return;
      }
      const title = dialog.querySelector(".title").value;
      const date = dialog.querySelector(".date").value;
      const summary = dialog.querySelector(".summary").value;
      await addPost(title, date, summary);
      update(updateView);
    }
  );
});

window.onload = async () => {
  await fetchPosts();
  update(updateView);
};

function makePost(
  { title, date, summary },
  template,
  deletePostHandler,
  updatePostHandler
) {
  template.querySelector(".title").textContent = title;
  template.querySelector(".date").textContent = date;
  template.querySelector(".summary").textContent = summary;
  template
    .querySelector(".delete")
    .addEventListener("click", deletePostHandler);
  template
    .querySelector(".update")
    .addEventListener("click", updatePostHandler);
  return template;
}

function updateView(blogPosts) {
  postList.innerHTML = "";
  for (let postIndex in blogPosts) {
    const post = blogPosts[postIndex];
    const newPostElement = makePost(
      post,
      postTemplate(),
      () =>
        confirm("Would you like to delete this post?", async (confirmed) => {
          if (confirmed) {
            await deletePost(postIndex);
            update(updateView);
          }
        }),
      () =>
        customPrompt(
          "edit-post",
          (dialog) => {
            dialog.querySelector(".title").value = post.title;
            dialog.querySelector(".date").value = post.date;
            dialog.querySelector(".summary").value = post.summary;
            dialog.querySelector(".index").value = postIndex;
          },
          async (dialog) => {
            if (!dialog) {
              return;
            }
            const title = dialog.querySelector(".title").value;
            const date = dialog.querySelector(".date").value;
            const summary = dialog.querySelector(".summary").value;
            const index = dialog.querySelector(".index").value;
            await updatePost(index, title, date, summary);
            update(updateView);
          }
        )
    );
    postList.appendChild(newPostElement);
  }
}
