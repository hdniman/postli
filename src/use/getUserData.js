import store from "../store"


export function getUserData (id, param = 'localId') { //param userId or localId(default)
  const users = store.getters['loadUsers/users']
  if (param == 'localId') {
    return users.find(el => el.localId == id)
  } else {
    return users.find(el => el.userId == id)
  }
  
}

