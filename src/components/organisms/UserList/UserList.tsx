import { useState, useMemo } from "react"
import { Grid, Box, Container } from "@mui/material"
import { UserCard } from "@/components/molecules/UserCard/UserCard"
import { SearchBar } from "@/components/molecules/SearchBar/SearchBar"
import { LoadingSpinner } from "@/components/molecules/LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "@/components/molecules/ErrorMessage/ErrorMessage"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Button } from "@/components/atoms/Button/Button"
import { useUserContext } from "@/contexts/UserContext"
import type { User } from "@/types/user.types"
import AddIcon from "@mui/icons-material/Add"

interface UserListProps {
  onViewUser: (user: User) => void
  onEditUser: (user: User) => void
  onAddUser: () => void
}

export const UserList = ({ onViewUser, onEditUser, onAddUser }: UserListProps) => {
  const { users, loading, error, deleteUser } = useUserContext()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users

    const query = searchQuery.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.phone.includes(query),
    )
  }, [users, searchQuery])

  if (loading) {
    return <LoadingSpinner message="Loading users..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            mb: { xs: 2, sm: 3 },
            gap: { xs: 2, sm: 2, md: 3 }
          }}
        >
          <Typography 
            variant="h4" 
            component="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            User Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={onAddUser}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '150px' }
            }}
          >
            Add User
          </Button>
        </Box>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, email, username, or phone..."
        />
      </Box>

      {filteredUsers.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: "center", 
            py: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3 }
          }}
        >
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {searchQuery ? "No users found matching your search." : "No users available."}
          </Typography>
        </Box>
      ) : (
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            width: '100%',
            margin: '0 auto'
          }}
        >
          {filteredUsers.map((user) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={user.id}
            >
              <UserCard 
                user={user} 
                onView={onViewUser} 
                onEdit={onEditUser} 
                onDelete={deleteUser} 
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
