'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import {Box} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
const RegisterLinesPage = () => {

const TextFieldForm = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const [age, setAge] = useState('');

const handleChange = (event: SelectChangeEvent) => {
  setAge(event.target.value);
};

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <DashboardCard title="Registro de Lineas">
            <Typography>Esta es la pagina de registro de lineas</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={2}>
        <Box my="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Nombre de la linea
        </Typography>
        <TextFieldForm type="text"    size="small" variant="outlined"  />
      </Box>
        </Grid>
        <Grid item xs={12} lg={2}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        </Grid>
    
    </PageContainer>
  );
};

export default RegisterLinesPage;

