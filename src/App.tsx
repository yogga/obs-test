import { CssBaseline, ThemeProvider } from "@mui/material"
import { UserProvider } from "@/contexts/UserContext"
import { HomePage } from "@/pages/HomePage/HomePage"
import { theme } from "@/theme/theme"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <HomePage />
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
