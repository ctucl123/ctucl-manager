'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PuntosRegistrados from '../components/dashboard/PuntosRegistrados';
import { Grid } from '@mui/material';
const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <DashboardCard title="Listado de Puntos">
            <Typography>Esta es la pagina de listado de puntos</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <PuntosRegistrados/>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SamplePage;

