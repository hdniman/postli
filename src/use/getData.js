import store from "../store"


export function getPostData (id) {
  const posts = store.getters['posts/posts']
  return posts.find(el => el.postId == id)
}

export function getUserData (id, param = 'localId') { //param userId or localId(default)
  const users = store.getters['users/users']
  if (param == 'localId') {
    return users.find(el => el.localId == id)
  } else {
    return users.find(el => el.userId == id)
  } 
}

