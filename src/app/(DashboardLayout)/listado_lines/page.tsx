'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Listado de Lineas">
        <Typography>Esta es la pagina de listado de lineas</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

