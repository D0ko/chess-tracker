import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { RefreshOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ErrorAlert = ({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
        <Alert
          severity="error"
          action={
            onRetry && (
              <Button
                color="inherit"
                size="small"
                startIcon={<RefreshOutlined />}
                onClick={onRetry}
              >
                Réessayer
              </Button>
            )
          }
        >
          <AlertTitle>Erreur</AlertTitle>
          {error?.message || 'Une erreur est survenue lors du chargement des données.'}
        </Alert>
      </Box>
    </motion.div>
  );
};

export default ErrorAlert;