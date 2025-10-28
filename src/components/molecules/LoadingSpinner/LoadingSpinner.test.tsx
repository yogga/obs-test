import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LoadingSpinner } from "./LoadingSpinner"

describe("LoadingSpinner Component", () => {
  it("should render with default message", () => {
    render(<LoadingSpinner />)
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("should render with custom message", () => {
    render(<LoadingSpinner message="Loading users..." />)
    expect(screen.getByText("Loading users...")).toBeInTheDocument()
  })
})
