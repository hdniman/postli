import store from "../store"


export function getPostData (id) {
  const posts = store.getters['loadPosts/posts']
  return posts.find(el => el.postId == id)
}

