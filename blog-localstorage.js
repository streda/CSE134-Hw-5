// let blogPosts = [];

// export async function addPost(title, date, summary) {
//   const newPost = createPost(title, date, summary);
//   blogPosts.push(newPost);
// }

// export async function updatePost(index, title, date, summary) {
//   blogPosts[index] = createPost(title, date, summary);
// }

// export async function deletePost(index) {
//   blogPosts.splice(index, 1);
// }

// export async function fetchPosts()  {
//   blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
// };

// export async function update(updateView) {
//   updateLocalStorage();
//   updateView(blogPosts);
// }

// function createPost(title, date, summary) {
//   return {
//     title,
//     date,
//     summary,
//   };
// }

// function updateLocalStorage() {
//   localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
// }

