

const STATUS_COLOR = {
  200 : "success",
  401 : "warning"
}

const RATING_COLOR = {
  "likes" : "primary",
  "dislikes" : "warning"
}
const RATING_TITLE = {
  "likes" : "liked",
  "dislikes" : "disliked"
}


export function statusColor(status){
  return STATUS_COLOR[status] ? STATUS_COLOR[status] : 'danger'
}

export function ratingColor(status){
  return RATING_COLOR[status] ? RATING_COLOR[status] : 'danger'
}

export function ratingTitle(status){
  return RATING_TITLE[status] ? RATING_TITLE[status] : 'danger'
}

