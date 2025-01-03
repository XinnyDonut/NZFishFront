const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ocean-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout