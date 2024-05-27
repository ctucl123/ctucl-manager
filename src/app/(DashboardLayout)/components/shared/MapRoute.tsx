import { MapContainer, Circle, TileLayer,useMap ,Polyline } from 'react-leaflet'
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
interface pointType {
	id: string;
	control_point: string;
	fastrack: number;
	latitud: number,
	longitud: number,
	posicion: number
}


type Props = {
    position: LatLngExpression;
    controlPoints: LatLngExpression[];
  };


const limeOptions = { color: '#58D68D' }
const MapRoute = ({ position,controlPoints }: Props) => {
    
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
        <UpdateCenter position={position} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=dc6c9fa0348f4922916b4b87c871e1ce"
      />
      {controlPoints.map((item:LatLngExpression)=>
      (
        <Circle center={item} radius={30} />
      )
      )}
      <Polyline pathOptions={limeOptions} positions={controlPoints} />
      
    </MapContainer>
  )
}

const UpdateCenter = ({ position }: { position: LatLngExpression }) => {
    const map = useMap();
  
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
  
    return null;
  };
  

export default MapRoute