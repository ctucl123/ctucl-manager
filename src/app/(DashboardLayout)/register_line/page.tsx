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
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { db } from '@/app/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
import Swal from 'sweetalert2';
interface pointType {
	id: string;
	control_point: string;
	fastrack: number;
	latitud: string,
	longitud: string,
	posicion: number
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
const defaultPoints: pointType[] = [];


const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

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
const RegisterLinesPage = () => {


	const [value, setValue] = useState<pointType | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [group, setGroup] = useState('');
	const [tipo, setTipo] = useState('0');
	const [dataPoint, setDataPoint] = useState(defaultPoints);
	const [points, setPoints] = useState(defaultPoints);
	const [returnPoints, setReturnPoints] = useState<pointType[]>([]);
	const [tab, setTab] = useState(0);
	const handleChange = (event: SelectChangeEvent) => {
		setGroup(event.target.value);
	};

	const handleTipo = (event: SelectChangeEvent) => {
		setTipo(event.target.value);
		setTab(parseInt(event.target.value, 10));
	};
	const agregarPuntoLinea = () => {
		console.log(value)
		console.log("hola")
		if (value === null) {
			Swal.fire({
				title: "Error!",
				text: "Seleccione un punto",
				icon: "error"
			});
		} else {
			if (tipo === "0") {

				let aux_points = JSON.parse(JSON.stringify(points))
				let flag: boolean = aux_points.some((obj: pointType) => obj.id === value.id);
				const aux_pos = aux_points.length + 1
				if (flag === false) {
					const aux_data = {
						id: value.id,
						control_point: value.control_point,
						fastrack: value.fastrack,
						latitud: value.latitud,
						longitud: value.longitud,
						posicion: aux_pos,
					}
					aux_points.push(aux_data)
					setPoints(aux_points)
				}
			} else {
				let aux_points_return = JSON.parse(JSON.stringify(returnPoints))
				let flag: boolean = aux_points_return.some((obj: pointType) => obj.id === value.id);
				const aux_pos = aux_points_return.length + 1
				if (flag === false) {
					const aux_data = {
						id: value.id,
						control_point: value.control_point,
						fastrack: value.fastrack,
						latitud: value.latitud,
						longitud: value.longitud,
						posicion: aux_pos,
					}
					aux_points_return.push(aux_data)
					setReturnPoints(aux_points_return)
				}
			}
		}
	}

	const movePoint = (target: pointType, tipo: number, up: boolean) => {
			let aux_points = []
			if(tipo === 0 ){
				aux_points = JSON.parse(JSON.stringify(points))
			}else{
				aux_points = JSON.parse(JSON.stringify(returnPoints))
			}
			let aux_lon = aux_points.lenght - 1
			if (up) {
				if (aux_points[aux_lon].id === target.id) {
					// aqui debo crear la condicion para cuando el punto que quiera mover este en el maximo
				} else {
					let aux_posicion = target.posicion + 1
					let points_organized = aux_points.map((item: pointType) => {
						if (item.posicion === aux_posicion) {
							item.posicion = item.posicion - 1
						}
						if (item.id === target.id) {
							item.posicion = aux_posicion
						}
						return item
					})
				}
			} else {
				if (aux_points[0].id === target.id) {
					// aqui debo crear la condicion para cuando el punto que quiera mover este en el maximo
				} else {
					let aux_posicion = target.posicion - 1
					let points_organized = aux_points.map((item: pointType) => {
						if (item.posicion === aux_posicion) {
							item.posicion = item.posicion + 1
						}
						if (item.id === target.id) {
							item.posicion = aux_posicion
						}
						return item
					})
				}

			}
	
	}


	const handleTab = (event: React.SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};


	const getData = async () => {
		const querySnapshot = await getDocs(collection(db, "puntos_control"));
		const aux_data: any = [];
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
							<Typography
								variant="subtitle1"
								fontWeight={600}
								component="label"
								htmlFor="password"
								mb="8px"
							>
								Seleccion de puntos
							</Typography>
						</Grid>
						<Grid item xs={12} lg={8}>
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
						<Grid item xs={12} lg={4}>

							<FormControl sx={{ m: 0, minWidth: 120 }} fullWidth size="small">
								<InputLabel id="demo-select-small-label">Tipo</InputLabel>
								<Select
									labelId="demo-select-small-label"
									id="demo-select-small"
									value={tipo}
									label="Tipo"
									onChange={handleTipo}
								>a
									<MenuItem value={'0'}>Ida</MenuItem>
									<MenuItem value={'1'}>Regreso</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} lg={12}>
							<Button variant="contained" onClick={agregarPuntoLinea} color='success'>Registrar Punto</Button>
						</Grid>

					</Grid>

				</Grid>
				<Grid item xs={12} lg={8}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={tab} onChange={handleTab} aria-label="basic tabs example">
							<Tab label="Puntos de Ida" {...a11yProps(0)} />
							<Tab label="Puntos de Regreso" {...a11yProps(1)} />
						</Tabs>
					</Box>
					<CustomTabPanel value={tab} index={0}>
						<h4>Puntos de Ida</h4>
						<TableContainer component={Paper} style={{ overflow: "scrollY", maxHeight: 350 }}>
							<Table aria-label="customized table">
								<TableHead>
									<TableRow>
										<StyledTableCell></StyledTableCell>
										<StyledTableCell>Posicion</StyledTableCell>
										<StyledTableCell>Direccion</StyledTableCell>
										<StyledTableCell align="right">Fastrack</StyledTableCell>
										<StyledTableCell align="right">Longitud</StyledTableCell>
										<StyledTableCell align="right">Latitud</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{points.map((row, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell component="th" scope="row">
												<Stack>
													<IconButton aria-label="delete" size="small" color="primary" onClick={()=>{movePoint(row,0,true)}} >
														<KeyboardArrowUpIcon />
													</IconButton>
													<IconButton aria-label="delete" size="small" color="primary" onClick={()=>{movePoint(row,0,false)}} >
														<KeyboardArrowDownIcon />
													</IconButton>
												</Stack>
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												{row.posicion}
											</StyledTableCell>
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
					</CustomTabPanel>
					<CustomTabPanel value={tab} index={1}>
						<h4>Puntos de Regreso</h4>
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
									{returnPoints.map((row, index) => (
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
					</CustomTabPanel>


				</Grid>
			</Grid>



		</PageContainer>
	);
};

export default RegisterLinesPage;

