import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import type { User } from '@/types/user.types';
import { getRandomImageUrl } from '@/services/api.service';

interface UserDetailsModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onEdit: (user: User) => void;
}

export const UserDetailsModal = ({ open, user, onClose, onEdit }: UserDetailsModalProps) => {
  if (!user) return null;

  const handleEdit = () => {
    onEdit(user);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          maxHeight: { xs: '80vh', sm: '80vh' },
          margin: { xs: 2, sm: 2 },
          width: { xs: 'calc(100% - 32px)', sm: '600px' },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            opacity: 0.1,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            pt: 4,
            pb: 0,
            color: 'text.primary',
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          User Details
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#666',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Avatar
              src={getRandomImageUrl(user.id)}
              alt={user.name}
              size="large"
              sx={{
                width: 120,
                height: 120,
                border: '4px solid white',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
            <Typography
              variant="h4"
              sx={{
                mt: 3,
                mb: 1,
                fontWeight: 600,
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              @{user.username}
            </Typography>
          </Box>

          <Divider
            sx={{
              mb: 4,
              '&.MuiDivider-root': {
                '&::before, &::after': {
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                },
              },
            }}
          />

          <Grid container spacing={3}>
            {[
              { label: 'Email', value: user.email },
              { label: 'Phone', value: user.phone },
              { label: 'Website', value: user.website },
              {
                label: 'Address',
                value: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
              },
              {
                label: 'Company',
                value: user.company.name,
                subtext: user.company.catchPhrase,
              },
            ].map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </Typography>
                  {item.subtext && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mt: 0.5,
                        fontStyle: 'italic',
                      }}
                    >
                      {item.subtext}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            bgcolor: 'background.default',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Button
            onClick={onClose}
            color="inherit"
            sx={{
              borderRadius: '20px',
              px: 3,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleEdit}
            sx={{
              borderRadius: '20px',
              px: 3,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
            }}
          >
            Edit Profile
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
