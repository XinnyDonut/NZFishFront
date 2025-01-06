const Hero = () => {
  return (
    <div className="bg-ocean-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between">
        {/* Left side */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            New Zealand Fish Guide
          </h1>
          <p className="text-ocean-100 mb-6">
            Kia Ora!
            New Zealand is home to a vast variety of fish, yet it feels like many people aren't fully taking advantage of this rich resource. 
            This website aims to help you explore New Zealand's diverse fish species, learn about them, and share your own cooking or fishing experiences.
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