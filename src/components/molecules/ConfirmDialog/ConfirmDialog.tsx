import { Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Button } from "@/components/atoms/Button/Button"

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          overflow: 'hidden',
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <DialogTitle sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={onCancel}
            color="inherit"
            sx={{
              borderRadius: '20px',
              px: 3,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            variant="contained" 
            color="error"
            sx={{
              borderRadius: '20px',
              px: 3,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}