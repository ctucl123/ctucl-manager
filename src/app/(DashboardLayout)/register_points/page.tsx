'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { db } from '@/app/firebaseConfig';
import { Query,getDocs,collection } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
// Version 1.0

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

