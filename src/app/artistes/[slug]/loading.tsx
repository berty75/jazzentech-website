export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="text-white pt-36 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 rounded w-1/2 mx-auto mb-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}></div>
              <div className="h-6 rounded w-1/3 mx-auto mb-6" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}></div>
              <div className="h-4 rounded w-1/4 mx-auto mb-8" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}></div>
              <div className="w-32 h-32 rounded-full mx-auto mb-8" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto animate-pulse space-y-8">
          <div className="h-12 rounded w-1/4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}></div>
          <div className="space-y-3">
            <div className="h-4 rounded" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}></div>
            <div className="h-4 rounded w-5/6" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}></div>
            <div className="h-4 rounded w-4/6" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}