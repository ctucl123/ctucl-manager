import { MapContainer, Circle, TileLayer,useMap  } from 'react-leaflet'
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

type Props = {
    position: LatLngExpression;
  };

const Map = ({ position }: Props) => {
    
  return (
    <MapContainer center={position} zoom={17} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
        <UpdateCenter position={position} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=dc6c9fa0348f4922916b4b87c871e1ce"
      />
      <Circle center={position} radius={15} />
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
  

export default Map