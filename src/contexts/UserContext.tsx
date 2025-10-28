import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/user.types"
import { fetchUsers } from "@/services/api.service"
import { toast } from "react-toastify"

interface UserContextType {
  users: User[]
  loading: boolean
  error: string | null
  addUser: (user: User) => void
  updateUser: (user: User) => void
  deleteUser: (id: number) => void
  getUserById: (id: number) => User | undefined
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const data = await fetchUsers()
        setUsers(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch users. Please try again later.")
        console.error("Error fetching users:", err)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user])
    toast.success("User added successfully!")
  }

  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    toast.success("User updated successfully!")
  }

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => {
      const userToDelete = prevUsers.find(user => user.id === id)
      if (userToDelete) {
        toast.success(`User ${userToDelete.name} deleted successfully!`)
      }
      return prevUsers.filter((user) => user.id !== id)
    })
  }

  const getUserById = (id: number): User | undefined => {
    return users.find((user) => user.id === id)
  }

  const value: UserContextType = {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
