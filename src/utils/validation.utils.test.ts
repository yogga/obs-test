import { describe, it, expect } from "vitest"
import { validateEmail, validatePhone, validateWebsite, validateRequired } from "./validation.utils"

describe("Validation Utils", () => {
  describe("validateEmail", () => {
    it("should validate correct email addresses", () => {
      expect(validateEmail("test@example.com")).toBe(true)
      expect(validateEmail("user.name@domain.co.uk")).toBe(true)
    })

    it("should reject invalid email addresses", () => {
      expect(validateEmail("invalid.email")).toBe(false)
      expect(validateEmail("@example.com")).toBe(false)
      expect(validateEmail("test@")).toBe(false)
    })
  })

  describe("validatePhone", () => {
    it("should validate correct phone numbers", () => {
      expect(validatePhone("1234567890")).toBe(true)
      expect(validatePhone("(123) 456-7890")).toBe(true)
      expect(validatePhone("+1-123-456-7890")).toBe(true)
    })

    it("should reject invalid phone numbers", () => {
      expect(validatePhone("123")).toBe(false)
      expect(validatePhone("abc")).toBe(false)
    })
  })

  describe("validateWebsite", () => {
    it("should validate correct website addresses", () => {
      expect(validateWebsite("example.com")).toBe(true)
      expect(validateWebsite("sub.example.co.uk")).toBe(true)
    })

    it("should reject invalid website addresses", () => {
      expect(validateWebsite("invalid")).toBe(false)
      expect(validateWebsite(".com")).toBe(false)
    })
  })

  describe("validateRequired", () => {
    it("should validate non-empty strings", () => {
      expect(validateRequired("test")).toBe(true)
      expect(validateRequired("a")).toBe(true)
    })

    it("should reject empty or whitespace-only strings", () => {
      expect(validateRequired("")).toBe(false)
      expect(validateRequired("   ")).toBe(false)
    })
  })
})
