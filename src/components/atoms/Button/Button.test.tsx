"use client"

import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./Button"

describe("Button Component", () => {
  it("should render button with children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("should handle click events", async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByText("Click me"))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it("should support variant prop", () => {
    render(<Button variant="contained">Contained</Button>)
    expect(screen.getByText("Contained")).toBeInTheDocument()
  })
})
