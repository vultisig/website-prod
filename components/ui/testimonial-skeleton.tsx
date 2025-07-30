export default function TestimonialSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 h-full animate-pulse">
      {/* Top section - large content placeholder */}
      <div className="mb-4">
        <div className="bg-slate-700/50 rounded-lg h-32 w-full"></div>
      </div>
      
      {/* Bottom section - text placeholders */}
      <div className="space-y-3">
        <div className="bg-slate-700/50 rounded h-4 w-full"></div>
        <div className="bg-slate-700/50 rounded h-4 w-full"></div>
        <div className="bg-slate-700/50 rounded h-4 w-3/4"></div>
        <div className="bg-slate-700/50 rounded h-4 w-1/2"></div>
      </div>
    </div>
  )
} 