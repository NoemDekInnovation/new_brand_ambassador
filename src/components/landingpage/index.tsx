import Navbar from './Navbar'
import Footer from './Footer'
import HeroSection from './HeroSection'

const LandingPage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-bm__layout'>
        <Navbar />
        <HeroSection />
        <Footer />
    </div>
  )
}

export default LandingPage