import Router from "./components/routes/Router.jsx"
import { SectionProvider } from "./components/state/SectionContext.jsx"

function App() {
  return (
    <SectionProvider>
      <Router />
    </SectionProvider>
  )
}

export default App
