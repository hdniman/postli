import store from "../store"


export function getPostData (id) {
  const posts = store.getters['posts/posts']
  return posts.find(el => el.postId == id)
}

export function getUserData (id, param = 'localId') { //param userId or localId(default)
  const users = store.getters['users/users']
  if (param == 'localId') {
    return users.find(el => el.localId == id)
  } else if (param == 'userId') {
    return users.find(el => el.userId == id)
  }
}

export function nestedProperty (object, path) {
  for (const element of path.split('.')) {
    if (object !== undefined && object.hasOwnProperty(element)) {
      object = object[element]
    } else {
      return false
    }
  }
  return true
}

