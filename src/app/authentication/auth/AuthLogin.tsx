import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];

}

const AuthLogin = ({ title, subtitle }: loginType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}



    <Stack>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="username"
          mb="5px"
        >
          Usuario
        </Typography>
        <CustomTextField variant="outlined" fullWidth />
      </Box>
      <Box my="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Contraseña
        </Typography>
        <CustomTextField type="password" variant="outlined" fullWidth />
      </Box>

    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        href="/"
        type="submit"
      >
        Iniciar Sesion
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
