import { Card, CardContent, CardActions, Box } from "@mui/material"
import { Avatar } from "@/components/atoms/Avatar/Avatar"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Button } from "@/components/atoms/Button/Button"
import { IconButton } from "@/components/atoms/IconButton/IconButton"
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog/ConfirmDialog"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import type { User } from "@/types/user.types"
import { getRandomImageUrl } from "@/services/api.service"
import { useState } from "react"

interface UserCardProps {
  user: User
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (id: number) => void
}

export const UserCard = ({ user, onView, onEdit, onDelete }: UserCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    onDelete(user.id)
    setIsDeleteDialogOpen(false)
  }

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false)
  }
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: { xs: 2, sm: 3 },
        "&:hover": {
          transform: { xs: "none", sm: "translateY(-4px)" },
          boxShadow: { 
            xs: "0 4px 12px rgba(0,0,0,0.05)", 
            sm: "0 12px 24px rgba(0,0,0,0.1)" 
          },
          "& .card-actions": {
            opacity: { xs: 1, sm: 1 },
            transform: { xs: "none", sm: "translateY(0)" },
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "inherit",
          background: "linear-gradient(45deg, #f6f7f8 0%, #ffffff 100%)",
          zIndex: 0,
        },
      }}
    >
      <CardContent sx={{ 
        flexGrow: 1, 
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        p: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mb: { xs: 2, sm: 3 },
          transform: { xs: "translateY(-4px)", sm: "translateY(-8px)" }
        }}>
          <Avatar 
            src={getRandomImageUrl(user.id)} 
            alt={user.name} 
            size="large"
            sx={{
              border: "4px solid white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
        <Typography 
          variant="h6" 
          gutterBottom 
          noWrap
          sx={{ 
            fontWeight: 600,
            color: "text.primary",
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          {user.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{
            mb: { xs: 1.5, sm: 2 },
            fontWeight: 500,
            fontSize: { xs: '0.875rem', sm: '0.875rem' }
          }}
        >
          {user.email}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          noWrap
          sx={{
            fontSize: { xs: '0.875rem', sm: '0.875rem' }
          }}
        >
          {user.phone}
        </Typography>
      </CardContent>
      <CardActions 
        className="card-actions"
        sx={{ 
          justifyContent: "space-between", 
          px: { xs: 2, sm: 3 }, 
          pb: { xs: 2, sm: 3 },
          opacity: { xs: 1, sm: 0 },
          transform: { xs: "none", sm: "translateY(10px)" },
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 1,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 0 },
          "& .MuiButton-root": {
            borderRadius: "20px",
            flexGrow: { xs: 1, sm: 0 },
            order: { xs: 1, sm: 0 }
          },
          "& .MuiIconButton-root": {
            backgroundColor: "background.paper",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: { xs: "scale(1.05)", sm: "translateY(-2px)" },
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          },
        }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onView(user)}
          sx={{
            px: { xs: 2, sm: 3 },
            "&:hover": {
              transform: { xs: "scale(1.02)", sm: "translateY(-2px)" },
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          View Profile
        </Button>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton 
            color="primary" 
            onClick={() => onEdit(user)}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            color="error" 
            onClick={handleDeleteClick}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Card>
  )
}
