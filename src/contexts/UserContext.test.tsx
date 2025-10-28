"use client"

import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { UserProvider, useUserContext } from "./UserContext"

// Mock the API service
vi.mock("@/services/api.service", () => ({
  fetchUsers: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        name: "Test User",
        username: "testuser",
        email: "test@example.com",
        phone: "1234567890",
        website: "example.com",
        address: { street: "123 Main St", suite: "Apt 1", city: "City", zipcode: "12345", geo: { lat: "0", lng: "0" } },
        company: { name: "Test Co", catchPhrase: "Test", bs: "test" },
      },
    ]),
  ),
}))

const TestComponent = () => {
  const { users, loading, error, addUser, deleteUser } = useUserContext()

  return (
    <div>
      <div data-testid="loading">{loading ? "Loading" : "Loaded"}</div>
      <div data-testid="error">{error || "No error"}</div>
      <div data-testid="user-count">{users.length}</div>
      <button
        onClick={() =>
          addUser({
            id: 2,
            name: "New User",
            username: "newuser",
            email: "new@example.com",
            phone: "9876543210",
            website: "new.com",
            address: {
              street: "456 Oak St",
              suite: "Apt 2",
              city: "City",
              zipcode: "54321",
              geo: { lat: "0", lng: "0" },
            },
            company: { name: "New Co", catchPhrase: "New", bs: "new" },
          })
        }
      >
        Add User
      </button>
      <button onClick={() => deleteUser(1)}>Delete User</button>
    </div>
  )
}

describe("UserContext", () => {
  it("should provide users from API", async () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("user-count")).toHaveTextContent("1")
    })
  })

  it("should add a user", async () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("user-count")).toHaveTextContent("1")
    })

    screen.getByText("Add User").click()

    await waitFor(() => {
      expect(screen.getByTestId("user-count")).toHaveTextContent("2")
    })
  })

  it("should delete a user", async () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("user-count")).toHaveTextContent("1")
    })

    screen.getByText("Delete User").click()

    await waitFor(() => {
      expect(screen.getByTestId("user-count")).toHaveTextContent("0")
    })
  })
})
