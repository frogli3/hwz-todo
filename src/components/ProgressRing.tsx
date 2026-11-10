import { motion } from 'motion/react'

export function ProgressRing({ total, done }: { total: number; done: number }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const fraction = total > 0 ? done / total : 0
  const offset = circumference * (1 - fraction)

  return (
    <div role="img" aria-label={`${done} von ${total} erledigt`} className="relative size-[72px]">
      <svg width={72} height={72} viewBox="0 0 72 72" className="-rotate-90">
        <circle
          cx={36}
          cy={36}
          r={radius}
          strokeWidth={8}
          fill="none"
          className="stroke-muted"
        />
        <motion.circle
          cx={36}
          cy={36}
          r={radius}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          className="stroke-accent"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold">
        {done}/{total}
      </span>
    </div>
  )
}
