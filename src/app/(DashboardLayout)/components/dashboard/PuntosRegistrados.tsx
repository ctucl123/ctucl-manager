
import {
    Typography, Box,
    Table,
    TableContainer,
    TablePagination,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { useState } from 'react';
interface point {
    id: number;
    control_point: string;
    fastrack: number;
    latitud: string,
    longitud: string,
  }
interface MyComponentProps {
    data: point[];
  }



const PuntosRegistrados = ({
    data
}:MyComponentProps) => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    return (

        <DashboardCard title="Puntos Registrados">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <TableContainer sx={{ maxHeight: 340 }}>
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
                        {data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((product) => (
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
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Box>
        </DashboardCard>
    );
};

export default PuntosRegistrados;
