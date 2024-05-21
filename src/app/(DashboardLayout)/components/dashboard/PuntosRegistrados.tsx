
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const products = [
    {
        id: 1,
        control_point: "Estancia del Río",
        fastrack: 10,
        latitud: "-3.95495",
        longitud: "-79.2147",
    },

];


const PuntosRegistrados = () => {
    return (

        <DashboardCard title="Puntos Registrados">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Punto de Control
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Fastrack
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Latitud
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Longitud
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Acciones
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.control_point}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.fastrack}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: "#82E0AA",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.latitud}
                                    ></Chip>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: "#F0B27A",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.longitud}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        type="submit"
                                    >
                                        EDITAR
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default PuntosRegistrados;
