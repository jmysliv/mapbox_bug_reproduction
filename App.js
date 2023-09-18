import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps'
import { useCallback, useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();
MapboxGL.setAccessToken("TOKEN")

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Download'
        >
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Download" component={Download} />
        </Tab.Navigator>
      </NavigationContainer>  
  );
}

export function Download() {
  const [downloaded, setDownloaded] = useState([])

  useEffect(() => {
    const checkDownload = async () => {
      const results = []
      const packs = await MapboxGL.offlineManager.getPacks()
      console.log(packs)
      const world = await MapboxGL.offlineManager.getPack('WORLD')
      console.log(world)
      if (world) {
        results.push('WORLD')
      }
      const poland = await MapboxGL.offlineManager.getPack('PL')
      console.log(poland)
      if (poland) {
        results.push('PL')
      }
      setDownloaded(results)
    }
    checkDownload()
  }, [])

  const errorListener = (pack, error) => {
    console.log(pack, error)
  }

  const progressListenerMap = async (pack, status) => {
    console.log(pack, status)
    const finished = status?.state === 'complete'
    if (finished) {
      setDownloaded(prev => [...prev, pack.name])
    }
  }

  const downloadWorld = useCallback(async () => {
    try {
        if (!downloaded.includes('WORLD')) {
          // Download tiles from Mapbox
          await MapboxGL.offlineManager.createPack({
            name: 'WORLD',
            styleURL: "mapbox://styles/mapbox/streets-v12",
            minZoom: 0,
            maxZoom: 4,
            bounds: [[180, 90], [-180, -90]]
          }, progressListenerMap, errorListener)
        } 
    } catch (error) {
      console.log(error)
    }
  }, [downloaded])

  const downloadPoland = useCallback(async () => {
    try {
        if (!downloaded.includes('PL')) {
          // Download tiles from Mapbox
          await MapboxGL.offlineManager.createPack({
            name: 'PL',
            styleURL: "mapbox://styles/mapbox/streets-v12",
            minZoom: 4,
            maxZoom: 9,
            bounds: [[24.2, 54.9], [14.1, 48.9]]
          }, progressListenerMap, errorListener)
        } 
    } catch (error) {
      console.log(error)
    }
  }, [downloaded])
  
  return <View style={{width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Text>Downloaded: {downloaded}</Text>
      <Button onPress={downloadWorld} title='Download world' style={{marginTop: 16}}/>
      <Button onPress={downloadPoland} title='Download poland'/>
  </View>
}


export function Map() {
  const [center, setCenter] = useState(null);

  return <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
      <MapboxGL.MapView
          style={{flex: 1, width: '100%'}}
          localizeLabels
          styleURL='mapbox://styles/mapbox/streets-v12'
          pitchEnabled={false}
          rotateEnabled={false}
          onMapIdle={(event) => {
            setCenter(event.properties.center);
            console.log(event.properties.center)
          }}
    >
      <MapboxGL.Camera
        centerCoordinate={[19, 50]}
        animationDuration={100}
        animationMode="flyTo"
        zoomLevel={5}
      />
    </MapboxGL.MapView>
    {center &&
    <View style={{
      position: 'absolute',
      height: 100,
      width: 100,
      bottom: 0,
      right: 0,
      backgroundColor: 'white',
    }}>
      <Text>Lat: {center[0].toFixed(2)} Lng: {center[1].toFixed(2)}</Text>
    </View>}
  </View>
}