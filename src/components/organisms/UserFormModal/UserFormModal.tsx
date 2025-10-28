import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Alert } from "@mui/material"
import { TextField } from "@/components/atoms/TextField/TextField"
import { Button } from "@/components/atoms/Button/Button"
import type { User, UserFormData } from "@/types/user.types"
import { validateEmail, validatePhone, validateWebsite, validateRequired } from "@/utils/validation.utils"

interface UserFormModalProps {
  open: boolean
  user: User | null
  onClose: () => void
  onSave: (user: User) => void
}

const initialFormData: UserFormData = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  companyName: "",
  catchPhrase: "",
  bs: "",
}

export const UserFormModal = ({ open, user, onClose, onSave }: UserFormModalProps) => {
  const [formData, setFormData] = useState<UserFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({})
  const [submitError, setSubmitError] = useState<string>("")

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        companyName: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      })
    } else {
      setFormData(initialFormData)
    }
    setErrors({})
    setSubmitError("")
  }, [user, open])

  const handleChange = (field: keyof UserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {}

    if (!validateRequired(formData.name)) {
      newErrors.name = "Name is required"
    }
    if (!validateRequired(formData.username)) {
      newErrors.username = "Username is required"
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number"
    }
    if (formData.website && !validateWebsite(formData.website)) {
      newErrors.website = "Invalid website format"
    }
    if (!validateRequired(formData.city)) {
      newErrors.city = "City is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      setSubmitError("Please fix the errors before submitting")
      return
    }

    const userData: User = {
      id: user?.id || Date.now(),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
        geo: user?.address.geo || { lat: "0", lng: "0" },
      },
      company: {
        name: formData.companyName,
        catchPhrase: formData.catchPhrase,
        bs: formData.bs,
      },
    }

    onSave(userData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={handleChange("name")}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleChange("username")}
              error={!!errors.username}
              helperText={errors.username}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={handleChange("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website"
              value={formData.website}
              onChange={handleChange("website")}
              error={!!errors.website}
              helperText={errors.website}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Street" value={formData.street} onChange={handleChange("street")} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Suite" value={formData.suite} onChange={handleChange("suite")} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={handleChange("city")}
              error={!!errors.city}
              helperText={errors.city}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Zipcode" value={formData.zipcode} onChange={handleChange("zipcode")} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              value={formData.companyName}
              onChange={handleChange("companyName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Catchphrase"
              value={formData.catchPhrase}
              onChange={handleChange("catchPhrase")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {user ? "Update" : "Add"} User
        </Button>
      </DialogActions>
    </Dialog>
  )
}
