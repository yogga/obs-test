import { Avatar as MuiAvatar } from "@mui/material"

interface AvatarProps {
  src: string
  alt: string
  size?: "small" | "medium" | "large"
}

const sizeMap = {
  small: { width: 40, height: 40 },
  medium: { width: 56, height: 56 },
  large: { width: 120, height: 120 },
}

export const Avatar = ({ src, alt, size = "medium" }: AvatarProps) => {
  return <MuiAvatar src={src} alt={alt} sx={sizeMap[size]} />
}
