'use client';
import { Typography, TextField, Button, Box, Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { db } from '@/app/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

const SamplePage = () => {
  // Estado para los campos de Persona
  const [local, setLocal] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contacto, setContacto] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Estado para los campos restantes
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [equipo, setEquipo] = useState('');
  const [contrato, setContrato] = useState('');

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      await addDoc(collection(db, 'puntos_recarga'), {
        Persona: {
          local,
          direccion,
          contacto,
          correo,
          cedula,
          usuario,
          contrasena
        },
        latitud,
        longitud,
        equipo,
        contrato
      });

      // Limpiar los campos después de enviar el formulario
      setLocal('');
      setDireccion('');
      setContacto('');
      setCorreo('');
      setCedula('');
      setUsuario('');
      setContrasena('');
      setLatitud('');
      setLongitud('');
      setEquipo('');
      setContrato('');

      alert('Registro exitoso');
    } catch (error) {
      console.error('Error al registrar el establecimiento:', error);
      alert('Error al registrar el establecimiento');
    }
  };

  return (
    <PageContainer title="Registro de Puntos" description="this is Sample page">
      <DashboardCard title="Registro de puntos">
        <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, border:'2px solid green'  }}>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Información de Persona
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Nombre del Local"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    required
                  />
                  <TextField
                    label="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                  <TextField
                    label="Contacto"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    required
                  />
                  <TextField
                    label="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  <TextField
                    label="Cédula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                  />
                  <TextField
                    label="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                  />
                  <TextField
                    label="Contraseña"
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Información Adicional
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Latitud"
                    value={latitud}
                    onChange={(e) => setLatitud(e.target.value)}
                    required
                  />
                  <TextField
                    label="Longitud"
                    value={longitud}
                    onChange={(e) => setLongitud(e.target.value)}
                    required
                  />
                  <TextField
                    label="Equipo"
                    value={equipo}
                    onChange={(e) => setEquipo(e.target.value)}
                    required
                  />
                  <TextField
                    label="Contrato"
                    value={contrato}
                    onChange={(e) => setContrato(e.target.value)}
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">Registrar Establecimiento</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
