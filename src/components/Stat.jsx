import React from 'react'

const Stat = () => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
      <div className="flex items-start gap-4">
        {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
        <div className="flex-1">
          <div className="text-2xl font-extrabold tracking-tight text-white">{value}</div>
          <div className="mt-1.5 text-xs font-semibold text-white/70 leading-relaxed">{label}</div>
        </div>
      </div>
    </div>
  )
}

export default Stat