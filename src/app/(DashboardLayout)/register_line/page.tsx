'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { db } from '@/app/firebaseConfig';
import {getDocs,collection } from 'firebase/firestore';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

interface pointType {
    id: number;
    control_point: string;
    fastrack: number;
    latitud: string,
    longitud: string,
  }
const defaultPoints:pointType[] = [];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const RegisterLinesPage = () => {

	const TextFieldForm = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
		'& .MuiOutlinedInput-input::-webkit-input-placeholder': {
			color: theme.palette.text.secondary,
			opacity: '0.8',
		},
		'& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
			color: theme.palette.text.secondary,
			opacity: '1',
		},
		'& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
			borderColor: theme.palette.grey[200],
		},
	}));

	const [value, setValue] = useState<pointType | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [group, setGroup] = useState('');
	const [dataPoint, setDataPoint] = useState(defaultPoints);
	const [points,setPoints] = useState(defaultPoints);

	const handleChange = (event: SelectChangeEvent) => {
		setGroup(event.target.value);
	};
	const  getData = async() => {
		const querySnapshot = await getDocs(collection(db, "puntos_control"));
		const aux_data:any = [];
		querySnapshot.forEach((doc) => {
		  aux_data.push(doc.data())
		});
		setDataPoint(aux_data)
		
	  }
	  useEffect(() => {
		getData();
	  }, []);

	return (
		<PageContainer title="Sample Page" description="this is Sample page">
			<Grid container spacing={1}>
				<Grid item xs={12} lg={4}>
					<Grid container spacing={3}>
						<Grid item xs={12} lg={12}>
							<DashboardCard title="Registro de Lineas">
								<Typography>Esta es la pagina de registro de lineas</Typography>
							</DashboardCard>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Stack spacing={2}>
								<Typography
									variant="subtitle1"
									fontWeight={600}
									component="label"
									htmlFor="password"
									mb="8px"
								>
									Numero de la linea
								</Typography>
								<TextFieldForm fullWidth type="text" size="small" variant="outlined" />
							</Stack>
						</Grid>
						<Grid item xs={12} lg={6}>

							<Stack spacing={2}>
								<Typography
									variant="subtitle1"
									fontWeight={600}
									component="label"
									htmlFor="password"
									mb="8px"
								>
									Grupo de la linea
								</Typography>
								<FormControl sx={{ m: 0, minWidth: 120 }} fullWidth size="small">
									<InputLabel id="demo-select-small-label">Grupo</InputLabel>
									<Select
										labelId="demo-select-small-label"
										id="demo-select-small"
										value={group}
										label="Grupo"
										onChange={handleChange}
									>
										<MenuItem value="">z
											<em>None</em>
										</MenuItem>
										<MenuItem value={1}>Grupo 1</MenuItem>
										<MenuItem value={2}>Grupo 2</MenuItem>
									</Select>
								</FormControl>
							</Stack>

						</Grid>
						<Grid item xs={12} lg={12}>
						<Autocomplete
							size='small'
							value={value}
							fullWidth
							onChange={(event, newValue) => {
								
									setValue(newValue);
							  }}
							inputValue={inputValue}
							onInputChange={(event, newInputValue) => {
											setInputValue(newInputValue);
											}}
							getOptionLabel={(option) => {
								// Value selected with enter, right from the input
								if (typeof option === 'string') {
								  return option;
								}
								return option.control_point;
							  }}
							id="controllable-states-demo"
							options={dataPoint}
							renderInput={(params) => <TextField {...params} label="Seleccionar Punto" />}
					/>
						</Grid>
						<Grid item xs={12} lg={12}>
						<Button variant="contained" color='success'>Registrar Punto</Button>
						</Grid>

					</Grid>

				</Grid>
				<Grid item xs={12} lg={8}>
					<TableContainer component={Paper} style={{ overflow: "scrollY", maxHeight: 350 }}>
						<Table aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Direccion</StyledTableCell>
									<StyledTableCell align="right">Fastrack</StyledTableCell>
									<StyledTableCell align="right">Longitud</StyledTableCell>
									<StyledTableCell align="right">Latitud</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{points.map((row,index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component="th" scope="row">
											{row.control_point}
										</StyledTableCell>
										<StyledTableCell align="right">{row.fastrack}</StyledTableCell>
										<StyledTableCell align="right">{row.latitud}</StyledTableCell>
										<StyledTableCell align="right">{row.longitud}</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>


				</Grid>
			</Grid>



		</PageContainer>
	);
};

export default RegisterLinesPage;

