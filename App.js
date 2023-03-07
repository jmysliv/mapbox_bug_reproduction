import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map } from './src/Map';
import { Switch } from './src/Switch';
import { OfflineContext } from './src/context';
import { useState } from 'react';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
