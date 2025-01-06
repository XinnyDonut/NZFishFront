const Layout = ({ children }) => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dqc0mub8o/image/upload/v1736062313/background_upyfnt.jpg)`  
      }}
    >
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout