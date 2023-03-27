import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps'
import { useContext, useEffect, useState, createContext } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export const OfflineContext = createContext()
const Tab = createBottomTabNavigator();

export default function App() {
  const [offline, setOffline] = useState(true)
  return (
    <OfflineContext.Provider value={[offline, setOffline]}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Switch" component={Switch} />
        </Tab.Navigator>
      </NavigationContainer>
    </OfflineContext.Provider>
  
   
  );
}

export function Switch() {
  const [offline, setOffline] = useContext(OfflineContext);
  
  return <View style={{width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Text>{offline ? 'Offline' : 'Online'}</Text>
      <Button onPress={() => setOffline(!offline)} title='Change'/>
  </View>
}

MapboxGL.setAccessToken("ACCESS_TOKEN")

export function Map() {
  const [offline] = useContext(OfflineContext)

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