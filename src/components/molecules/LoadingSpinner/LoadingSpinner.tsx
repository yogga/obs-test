import { Box, CircularProgress, keyframes } from "@mui/material"
import { Typography } from "@/components/atoms/Typography/Typography"

interface LoadingSpinnerProps {
  message?: string
}

const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
`

export const LoadingSpinner = ({ message = "Loading..." }: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        gap: 3,
        animation: `${pulse} 2s ease-in-out infinite`,
      }}
    >
      <Box sx={{ 
        position: 'relative',
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress 
          size={80} 
          thickness={2}
          sx={{
            color: 'primary.light',
            position: 'absolute',
            left: 0,
            opacity: 0.2,
          }}
        />
        <CircularProgress 
          size={60} 
          thickness={3}
          sx={{
            color: 'primary.main',
            position: 'absolute',
            left: '10px',
            opacity: 0.6,
          }}
        />
        <CircularProgress 
          size={40} 
          thickness={4}
          sx={{
            color: 'primary.dark',
            position: 'absolute',
            left: '20px',
          }}
        />
      </Box>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'text.secondary',
          fontWeight: 500,
          opacity: 0.8,
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}
