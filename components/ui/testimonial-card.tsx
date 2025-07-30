import { Star } from "lucide-react"

export default function TestimonialCard({ text, author, tag, initial }: { text: string, author: string, tag: string, initial: string }) {
  return (
    <div className="relative flex flex-col items-center text-center w-full">
      {/* Main testimonial card */}
      <div
        className="
            relative w-full max-w-sm bg-white rounded-2xl border-2 border-[var(--border-color)] overflow-hidden
            shadow-[0_0_10px_rgba(var(--border-color-rgb),0.5)]
        "
        style={{ background: 'linear-gradient(180deg, #061B3A 0%, rgba(6, 27, 58, 0) 100%)' }}
      >
        {/* Gradient background
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(180deg, #061B3A 0%, rgba(6, 27, 58, 0) 100%)'
          }}
        /> */}
        
        {/* Content container */}
        <div className="relative z-10 p-8 min-h-[260px] flex flex-col justify-between">                
          {/* Testimonial text */}
          <p className="text-sm leading-relaxed mb-2">
            {text}
          </p>
          
          {/* Bottom section with stars and author name */}
          <div className="mt-auto">
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[var(--border-color)] fill-current" />
              ))}
            </div>
            
            {/* Author name */}
            <div className="text-center">
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                {author}
              </h4>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile picture */}
      <div className="relative -mt-8 mb-4">
        <div className="w-16 h-16 bg-[var(--background)] rounded-full flex items-center justify-center border-2 border-[var(--border-color)] shadow-lg">
          <span className="text-white text-xl font-bold">{initial}</span>
        </div>
      </div>
    </div>
  );
}
  