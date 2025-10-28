import { Box, Alert } from "@mui/material"

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  )
}
