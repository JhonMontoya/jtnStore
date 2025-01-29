import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
    return (
        <AppBar
          position="fixed"
          sx={{
            top: 'auto',
            bottom: 0,
            backgroundColor: '#bfbfe7',
            color: '#0000b9',
            boxShadow: 'none',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ textAlign: 'left' }}>
              &copy; {new Date().getFullYear()} JTNStore, All Right Reserved
            </Typography>
    
            <Box>
              <IconButton
                href="https://github.com/JhonMontoya"
                target="_blank"
                color="inherit"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com/in/guerrero-montoya-jhonathan"
                target="_blank"
                color="inherit"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                color="inherit"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
    );
}
