import { Alert, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface Props {
  retryFunction?: () => void;
  retryMessage?: string;
}

const ErrorAlert = ({ retryFunction, retryMessage = "Rééssayer" }: Props) => {
  return (
    <Alert severity='error'>
      <Stack
        flexDirection='column'
        gap='0.5rem'
        justifyContent='center'
        alignItems='center'
      >
        <Typography>Une erreur est survenue.</Typography>
        {retryFunction && (
          <Button variant='contained' size='small' onClick={retryFunction}>
            {retryMessage}
          </Button>
        )}
      </Stack>
    </Alert>
  );
};

export default ErrorAlert;
