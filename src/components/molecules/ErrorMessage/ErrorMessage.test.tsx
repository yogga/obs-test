import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ErrorMessage } from "./ErrorMessage"

describe("ErrorMessage Component", () => {
  it("should render error message", () => {
    render(<ErrorMessage message="An error occurred" />)
    expect(screen.getByText("An error occurred")).toBeInTheDocument()
  })
})
