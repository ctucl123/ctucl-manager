'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PuntosRegistrados from '../components/dashboard/PuntosRegistrados';
import { Grid } from '@mui/material';
import { db } from '@/app/firebaseConfig';
import { Query,getDocs,collection } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';



export default function PointsRegisterPage(){
  const [data, setData] = useState(products);


  const  getData = async() => {
    const querySnapshot = await getDocs(collection(db, "puntos_control"));
    const aux_data:any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
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
            <Typography>Esta es la pagina de listado de puntos</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <PuntosRegistrados data={data}/>
        </Grid>
      </Grid>
    </PageContainer>
  );
}


const products = [
  {
      id: 1,
      control_point: "Estancia del Río",
      fastrack: 10,
      latitud: "-3.95495",
      longitud: "-79.2147",
  },

];
