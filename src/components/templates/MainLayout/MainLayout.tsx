import type { ReactNode } from 'react';
import { Box, AppBar, Toolbar, Container, useTheme, useMediaQuery } from '@mui/material';
import { Typography } from '@/components/atoms/Typography/Typography';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255, 255, 255, 0.95)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between', 
              py: { xs: 1, sm: 1.5 },
              minHeight: { xs: 56, sm: 64 },
              px: '0 !important'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1.5, sm: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: isMobile ? '100px' : '120px',
                  height: isMobile ? '40px' : '50px',
                  transition: 'all 0.3s ease',
                }}
              >
                <img
                  src="/img/OBS_logo_h86.png"
                  alt="OBS Logo"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    transition: 'all 0.3s ease',
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' },
                }}
              ></Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar /> {/* Add this to prevent content from hiding under the fixed AppBar */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          bgcolor: 'background.default',
          pt: { xs: 7, sm: 8, md: 9 },
          pb: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
