'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Registro de Puntos" description="this is Sample page">
      <DashboardCard title="Registro de puntos">
        <Typography>Registro de Puntos</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

