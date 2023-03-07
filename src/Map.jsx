import { View } from 'react-native';
import MapboxGL from '@rnmapbox/maps'
import { useContext, useEffect } from 'react';
import { OfflineContext } from './context';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

MapboxGL.setAccessToken("ACCESS_TOKEN")


const icon = require('../assets/camp.png')

export function Map() {
    const [offline, setOffline] = useContext(OfflineContext)

    useEffect(() => {
        const getUserLocationAsync = async () => {
              const isEnabled = await Location.hasServicesEnabledAsync()
              if (isEnabled) {
                const { status } = await Location.requestForegroundPermissionsAsync()
                if (status !== 'granted') {
                  return;
                }
              }
            } 
          getUserLocationAsync();
    }, [])



    return <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
        {offline ?   
        <MapboxGL.MapView
            style={{flex: 1, width: '100%'}}
            showUserLocation
            localizeLabels
            pitchEnabled={false}
            rotateEnabled={false}
      >
         <MapboxGL.Camera
          centerCoordinate={[19, 50]}
          animationDuration={100}
          animationMode="flyTo"
        />
        <MapboxGL.UserLocation
          renderMode='native'
          androidRenderMode='gps'
          animated
        />
        
      </MapboxGL.MapView> :   
      <MapView
        showsUserLocation
        style={{flex: 1, width: '100%'}}
        rotateEnabled={false}
        moveOnMarkerPress={false}
        showsMyLocationButton={false}
      >
       
      </MapView>}
    </View>
}