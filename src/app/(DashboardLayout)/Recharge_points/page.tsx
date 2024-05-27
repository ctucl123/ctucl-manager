'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Grid } from '@mui/material';

const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <Grid container spacing={1}>
				<Grid item xs={12} lg={4}>
            <DashboardCard title="Sample Page">
              <Typography>Espacio para recargadores</Typography>
            </DashboardCard>
        </Grid>
        </Grid>
    </PageContainer>
  );
};

export default SamplePage;

