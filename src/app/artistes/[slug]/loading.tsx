export default function Loading() {
    return (
      <div className="min-h-screen bg-white">
        <div className="hero-gradient text-white pt-36 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-12 bg-white bg-opacity-20 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-6 bg-white bg-opacity-20 rounded w-1/3 mx-auto mb-6"></div>
                <div className="h-4 bg-white bg-opacity-20 rounded w-1/4 mx-auto mb-8"></div>
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-8"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }