import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { HowIWork } from './components/HowIWork'
import { TechStack } from './components/TechStack'
import { Certifications } from './components/Certifications'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { ScrollProgress } from './components/ScrollProgress'
import { BackgroundEffects } from './components/BackgroundEffects'
import { FloatingContactButton } from './components/FloatingContactButton'
import { CookieNotice } from './components/CookieNotice'

function App() {
  return (
    <>
      <BackgroundEffects />
      <ScrollProgress />
      <Header />
      <FloatingContactButton />
      <CookieNotice />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <HowIWork />
        <TechStack />
        <Certifications />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
