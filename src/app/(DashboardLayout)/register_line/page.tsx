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
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { uuid } from 'uuidv4';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Swal from 'sweetalert2';
import RouteIcon from '@mui/icons-material/Route';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MapRoute from '../components/shared/MapRoute';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';
import { newLine,resumePoint,newDate,pointType } from '@/app/appTypes';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
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
					<div>{children}</div>
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const TextFieldForm = styled((props: any) => <TextField  {...props} />)(({ theme }) => ({
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

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}


const initialPoint: pointType = {
	id: '',
	control_point: '',
	fastrack: 0,
	latitud: -3.9984601609417387,
	longitud: -79.20509166599096,
	posicion: 0
}


const defaultPoints: pointType[] = [];

const RegisterLinesPage = () => {


	const [selectedPoint, setSelectedPoint] = useState<pointType>(initialPoint);
	const [inputValue, setInputValue] = useState('');
	const [group, setGroup] = useState('1');
	const [tipo, setTipo] = useState('0');
	const [dbPoints, setDbPoints] = useState<pointType[]>(defaultPoints);
	const [startingPoints, setStartingPoints] = useState<pointType[]>(defaultPoints);
	const [returnPoints, setReturnPoints] = useState<pointType[]>(defaultPoints);
	const [tab, setTab] = useState(0);
	const [description, setDescription] = useState('');
	const [name, setName] = useState('');
	const [route,setRoute] = useState<LatLngExpression[]>([]);
	const [open, setOpen] = useState(false);
	const handleChange = (event: SelectChangeEvent) => {
		setGroup(event.target.value);
	};

	const handleTipo = (event: SelectChangeEvent) => {
		setTipo(event.target.value);
		setTab(parseInt(event.target.value, 10));
	};
	const handleClickOpen = (points:pointType[]) => {
		let route_points:LatLngExpression[] = points.map((item:pointType)=>([item.latitud,item.longitud]))
		setRoute(route_points)
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const agregarPuntoLinea = () => {

		console.log("hola")
		if (selectedPoint === null) {
			Swal.fire({
				title: "Error!",
				text: "Seleccione un punto",
				icon: "error"
			});
		} else {
			if (tipo === "0") {
				let aux_points = JSON.parse(JSON.stringify(startingPoints))
				let flag: boolean = aux_points.some((obj: pointType) => obj.id === selectedPoint.id);
				const aux_pos = aux_points.length + 1
				if (flag === false) {
					const aux_data = {
						id: selectedPoint.id,
						control_point: selectedPoint.control_point,
						fastrack: selectedPoint.fastrack,
						latitud: selectedPoint.latitud,
						longitud: selectedPoint.longitud,
						posicion: aux_pos,
					}
					aux_points.push(aux_data)
					setStartingPoints(aux_points)

				}
			} else {
				let aux_points_return = JSON.parse(JSON.stringify(returnPoints))
				let flag: boolean = aux_points_return.some((obj: pointType) => obj.id === selectedPoint.id);
				const aux_pos = aux_points_return.length + 1
				if (flag === false) {
					const aux_data = {
						id: selectedPoint.id,
						control_point: selectedPoint.control_point,
						fastrack: selectedPoint.fastrack,
						latitud: selectedPoint.latitud,
						longitud: selectedPoint.longitud,
						posicion: aux_pos,
					}
					aux_points_return.push(aux_data)
					setReturnPoints(aux_points_return)
				}
			}
		}
	}


	const movePointReturn = (target: pointType, up: boolean) => {
		let aux_points = JSON.parse(JSON.stringify(returnPoints))
		let aux_lon = aux_points.length - 1
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
				points_organized.sort((a: pointType, b: pointType) => a.posicion - b.posicion);
				setReturnPoints(points_organized)
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
				points_organized.sort((a: pointType, b: pointType) => a.posicion - b.posicion);
				setReturnPoints(points_organized)
			}

		}

	}

	const movePoint = (target: pointType, up: boolean) => {
		let aux_points = JSON.parse(JSON.stringify(startingPoints))
		let aux_lon = aux_points.length - 1
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
				points_organized.sort((a: pointType, b: pointType) => a.posicion - b.posicion);
				setStartingPoints(points_organized)
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
				points_organized.sort((a: pointType, b: pointType) => a.posicion - b.posicion);
				let route_points = points_organized.map((item:pointType)=>([item.latitud,item.longitud]))
				console.log(route_points)
				setRoute(route_points)
				setStartingPoints(points_organized)
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
		setDbPoints(aux_data)

	}

	const deletePoint = (point:pointType,starting:boolean)=>{

		if(starting){
			let aux_points:pointType[] = JSON.parse(JSON.stringify(startingPoints))
			let filter_data = aux_points.filter((item:pointType)=> item.id !== point.id).map((item:pointType,index)=>{
				item.posicion=index+1
				return item;
			})
			setStartingPoints(filter_data)
		}else{
			let aux_points:pointType[] = JSON.parse(JSON.stringify(returnPoints))
			let filter_data = aux_points.filter((item:pointType)=> item.id !== point.id)
			setReturnPoints(filter_data)
		}
	}
	const postData = async () => {
		if (name === null || name === "" || startingPoints.length === 0 || returnPoints.length === 0) {
			Swal.fire({
				icon: "warning",
				title: "Debes llenar el Campo numero",
				showConfirmButton: false,
				timer: 1500,

			});
		} else {
			let now = new Date();
			let date: newDate = {
				day: now.getDate(),
				month: now.getMonth() + 1, // Los meses empiezan desde 0
				year: now.getFullYear(),
				hours: now.getHours(),
				minutes: now.getMinutes(),
				seconds: now.getSeconds(),
			}
			let startingData: resumePoint[] = startingPoints.map((item) => ({
				id: item.id,
				position: item.posicion
			}))
			let returnData: resumePoint[] = returnPoints.map((item) => ({
				id: item.id,
				position: item.posicion
			}))
			const newId = uuid();
			let newline: newLine = {
				group: group,
				id: newId,
				date: date,
				starting: startingData,
				return: returnData,
				name: "LINEA-" + name,
				description: description,
				lastModify: []
			}
			await setDoc(doc(db, "lines", newId), newline);
			setName('')
			setDescription('')
			setStartingPoints(defaultPoints)
			setReturnPoints(defaultPoints)
			Swal.fire({
				title: "Exito",
				text: "Linea Creada con Exito!",
				icon: "success"
			});
		}

	}

	const Map = useMemo(() => dynamic(
		() => import('../components/shared/Map'),
		{
			loading: () => <p>A map is loading</p>,
			ssr: false
		}
	), [])

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
								<Typography>Seleccione los puntos de la linea y posteriormente llene los campos solicitados</Typography>
							</DashboardCard>
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
						<Grid item xs={12} lg={12}>
							<div style={{ width: "100%", height: 300 }}>
								<Map position={[selectedPoint.latitud, selectedPoint.longitud]} />
							</div>
						</Grid>
						<Grid item xs={12} lg={8}>
							<Autocomplete
								size='small'
								value={selectedPoint}
								fullWidth
								onChange={(event, newValue) => {
									console.log(newValue);
									if (newValue !== null) {
										setSelectedPoint(newValue);
									} else {
										setSelectedPoint(initialPoint)
									}
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
								options={dbPoints}
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
							<Button variant="contained" onClick={agregarPuntoLinea} color='success'>Agregar Punto</Button>
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
								<TextFieldForm
									fullWidth
									type="number"
									size="small"
									variant="outlined"
									value={name}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setName(event.target.value);
									}}
								/>
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

										<MenuItem value={1}>Grupo 1</MenuItem>
										<MenuItem value={2}>Grupo 2</MenuItem>
									</Select>
								</FormControl>
							</Stack>

						</Grid>
						<Grid item xs={12} lg={12}>
							<Stack spacing={2}>
								<Typography
									variant="subtitle1"
									fontWeight={600}
									component="label"
									htmlFor="password"
									mb="8px"
								>
									Descripcion
								</Typography>
								<TextFieldForm
									multiline
									rows={4}
									fullWidth
									type="text"
									size="small"
									variant="outlined"
									value={description}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setDescription(event.target.value);
									}}
								/>
							</Stack>
						</Grid>
						<Grid item xs={12} >

							<Button variant="contained" fullWidth onClick={postData} color='secondary'>Registrar Linea</Button>

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
					<CustomTabPanel value={tab} index={0} >

							<Button variant="contained" endIcon={<RouteIcon />} color='success'  onClick={()=>{handleClickOpen(startingPoints)}} sx={{ marginBottom: 2 }}>Mapear Puntos</Button>
						<TableContainer component={Paper} style={{ overflow: "scroll", maxHeight: 480 }}>
							<Table stickyHeader aria-label="customized table" >
								<TableHead>
									<TableRow>
										<StyledTableCell></StyledTableCell>
										<StyledTableCell>Direccion</StyledTableCell>
										<StyledTableCell align="center">Fastrack</StyledTableCell>
										<StyledTableCell align="left">Posicion</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{startingPoints.map((row, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell component="th" scope="row">
											<Stack direction={"row"}>
												<IconButton aria-label="delete" onClick={()=>{deletePoint(row,true)}}  color="error">
													<DeleteIcon />
												</IconButton>
											
												</Stack>
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												{row.control_point}
											</StyledTableCell>
											<StyledTableCell align="center">{row.fastrack}</StyledTableCell>
											<StyledTableCell align="right" component="th" scope="row">
												
												<Stack direction={"row"} alignContent={"center"} gap={4} alignItems={"center"}>
												<p>{row.posicion}</p>
												<Stack>
													<IconButton aria-label="delete" size="small" color="primary" onClick={() => { movePoint(row, false) }} >
														<KeyboardArrowUpIcon />
													</IconButton>
													<IconButton aria-label="delete" size="small" color="primary" onClick={() => { movePoint(row, true) }} >
														<KeyboardArrowDownIcon />
													</IconButton>
												</Stack>
												</Stack>
											</StyledTableCell>
											
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</CustomTabPanel>
					<CustomTabPanel value={tab} index={1}>
							<Button variant="contained" endIcon={<RouteIcon />} onClick={()=>{handleClickOpen(startingPoints)}} color='success' sx={{ marginBottom: 2 }}>Mapear Puntos</Button>
						<TableContainer component={Paper} style={{ overflow: "scroll", maxHeight: 480 }}>
							<Table stickyHeader aria-label="customized table">
								<TableHead>
									<TableRow>
										<StyledTableCell></StyledTableCell>
										<StyledTableCell>Direccion</StyledTableCell>
										<StyledTableCell align="center">Fastrack</StyledTableCell>
										<StyledTableCell align="left">Posicion</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{returnPoints.map((row, index) => (
										<StyledTableRow key={index}>
										<StyledTableCell component="th" scope="row">
										<Stack direction={"row"}>
											<IconButton aria-label="delete" onClick={()=>{deletePoint(row,false)}}  color="error">
												<DeleteIcon />
											</IconButton>
										
											</Stack>
										</StyledTableCell>
										<StyledTableCell component="th" scope="row">
											{row.control_point}
										</StyledTableCell>
										<StyledTableCell align="center">{row.fastrack}</StyledTableCell>
										<StyledTableCell align="right" component="th" scope="row">
											
											<Stack direction={"row"} alignContent={"center"} gap={4} alignItems={"center"}>
											<p>{row.posicion}</p>
											<Stack>
												<IconButton aria-label="delete" size="small" color="primary" onClick={() => { movePointReturn(row, false) }} >
													<KeyboardArrowUpIcon />
												</IconButton>
												<IconButton aria-label="delete" size="small" color="primary" onClick={() => { movePointReturn(row, true) }} >
													<KeyboardArrowDownIcon />
												</IconButton>
											</Stack>
											</Stack>
										</StyledTableCell>
										
									</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</CustomTabPanel>
				</Grid>
			</Grid>
			<Dialog
				maxWidth={"md"}
				fullWidth={true}
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Optional sizes</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You can set my maximum width and whether to adapt or not.
					</DialogContentText>
					<div style={{ width: "100%", height: 400 }}>
						<MapRoute controlPoints={route} position={[initialPoint.latitud,initialPoint.longitud]}/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</PageContainer>
	);
};

export default RegisterLinesPage;


