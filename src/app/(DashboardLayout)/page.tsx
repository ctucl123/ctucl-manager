'use client'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Typography } from '@mui/material';
const Dashboard = () => {
  return (
    <PageContainer title="Registro de Puntos" description="this is Sample page">
    <DashboardCard title="Dashboard Inicial">
      <Typography>Pagina de Inicio</Typography>
    </DashboardCard>
  </PageContainer>
  )
}

export default Dashboard;
