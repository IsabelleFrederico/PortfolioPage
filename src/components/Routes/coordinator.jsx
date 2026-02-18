
export const goToHome = () => {
  window.history.pushState({}, "", "/")
  window.dispatchEvent(new PopStateEvent("popstate"))
}

export const goToProjects = () => {
  window.history.pushState({}, "", "/?scroll=2.6&section=2")
  window.dispatchEvent(new PopStateEvent("popstate"))
}

export const goToLegal = () => {
  window.history.pushState({}, "", "/legal")
  window.dispatchEvent(new PopStateEvent("popstate"))
}

export const goToPrivacy = () => {
  window.history.pushState({}, "", "/privacy")
  window.dispatchEvent(new PopStateEvent("popstate"))
}

export const goToProjectsDetails = (id) => {
  window.history.pushState({}, "", `/projects/${id}`)
  window.dispatchEvent(new PopStateEvent("popstate"))
}
