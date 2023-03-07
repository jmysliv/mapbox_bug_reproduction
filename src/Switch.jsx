import { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { OfflineContext } from './context';

export function Switch() {
    const [offline, setOffline] = useContext(OfflineContext);
    
    return <View style={{width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text>{offline ? 'Offline' : 'Online'}</Text>
        <Button onPress={() => setOffline(!offline)} title='Change'/>
    </View>
}