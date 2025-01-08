import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dqc0mub8o/image/upload/v1736062313/background_upyfnt.jpg)`  
      }}
    >
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout