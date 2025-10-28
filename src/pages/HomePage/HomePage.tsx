import { useState } from "react"
import { MainLayout } from "@/components/templates/MainLayout/MainLayout"
import { UserList } from "@/components/organisms/UserList/UserList"
import { UserDetailsModal } from "@/components/organisms/UserDetailsModal/UserDetailsModal"
import { UserFormModal } from "@/components/organisms/UserFormModal/UserFormModal"
import { useUserContext } from "@/contexts/UserContext"
import type { User } from "@/types/user.types"

export const HomePage = () => {
  const { addUser, updateUser } = useUserContext()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setDetailsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormModalOpen(true)
  }

  const handleAddUser = () => {
    setEditingUser(null)
    setFormModalOpen(true)
  }

  const handleSaveUser = (user: User) => {
    if (editingUser) {
      updateUser(user)
    } else {
      addUser(user)
    }
  }

  return (
    <MainLayout>
      <UserList onViewUser={handleViewUser} onEditUser={handleEditUser} onAddUser={handleAddUser} />
      <UserDetailsModal
        open={detailsModalOpen}
        user={selectedUser}
        onClose={() => setDetailsModalOpen(false)}
        onEdit={handleEditUser}
      />
      <UserFormModal
        open={formModalOpen}
        user={editingUser}
        onClose={() => setFormModalOpen(false)}
        onSave={handleSaveUser}
      />
    </MainLayout>
  )
}
