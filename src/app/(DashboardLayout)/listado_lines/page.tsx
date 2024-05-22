'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Grid } from '@mui/material';
import { db } from '@/app/firebaseConfig';
import { Query,getDocs,collection } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
import LineasRegistradas from '../components/dashboard/LineasRegistradas';


export default function LinesRegisterPage(){
  const [data, setData] = useState(products);


  const  getData = async() => {
    const querySnapshot = await getDocs(collection(db, "lineas"));
    const aux_data:any = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      aux_data.push(doc.data())
    });
    setData(aux_data)
    
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <PageContainer title="Sample Page" description="this is Sample page">

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <DashboardCard title="Listado de Puntos">
            <Typography>Esta es la pagina de listado de lineas</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <LineasRegistradas data={data}/>
        </Grid>
      </Grid>
    </PageContainer>
  );
}


const products = [
  {
    grupo:0,
    name:"",
  },

];
