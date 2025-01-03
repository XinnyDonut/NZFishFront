const Hero = () => {
  return (
    <div className="bg-ocean-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 flex items-center justify-between">
        {/* Left side */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            New Zealand Fish Guide
          </h1>
          <p className="text-ocean-100 mb-6">
            Discover New Zealand's diverse fish species and learn how to cook them. 
            Share your cooking experiences and explore recipes from other food enthusiasts.
          </p>
          {/*button???? */}
        </div>
        
        {/* Right side */}
        <div className="w-1/2 pl-8">
          <img 
            src="https://res.cloudinary.com/dqc0mub8o/image/upload/v1735876964/fishHero_fpgegf.jpg" 
            alt="Fish Hero image" 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero