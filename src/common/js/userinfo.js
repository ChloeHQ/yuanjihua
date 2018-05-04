export function getUserInfo () {
  return localStorage
}

export function setUserInfo (obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      localStorage.setItem(prop, obj[prop])
    }
  }
}

export function deleteUserInfo () {
  localStorage.clear()
}
