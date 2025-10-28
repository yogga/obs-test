import type { User } from "@/types/user.types"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  return response.json()
}

export const getRandomImageUrl = (id: number): string => {
  return `https://picsum.photos/seed/${id}/200/200`
}
