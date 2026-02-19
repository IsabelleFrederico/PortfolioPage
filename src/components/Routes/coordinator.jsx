
export const goToSection = (navigate, sectionNumber, isProgrammaticNavRef) => {
    if (isProgrammaticNavRef) isProgrammaticNavRef.current = true
    navigate(`/?section=${sectionNumber}`)
}

export const goToLegal = (navigate) => navigate("/legal")

export const goToPrivacy = (navigate) => navigate("/privacy")

export const goToProjectsDetails = (id) => {
    window.history.pushState({}, "", `/projects/${id}`)
    window.dispatchEvent(new PopStateEvent("popstate"))
}
