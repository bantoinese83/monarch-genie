import React from 'react'
import { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size?: number | string
  className?: string
  'aria-label'?: string
}

export function Icon({
  icon: IconComponent,
  size = 24,
  className = '',
  ...props
}: IconProps) {
  return <IconComponent size={size} className={className} {...props} />
}
