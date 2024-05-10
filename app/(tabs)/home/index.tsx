import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
	const [mapRegion, setMapRegion] = useState({
		latitude: 33.67049627269136,
		longitude: -7.379628725233621,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [location, setLocation] = useState<Location.LocationObjectCoords>();
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location: Location.LocationObjectCoords = await (
				await Location.getCurrentPositionAsync({})
			).coords;

			setLocation(location);
			setMapRegion({
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		})();
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location.latitude);
		text = location.latitude + ' ' + location.longitude;
	}

	return (
		<View style={styles.container}>
			<MapView style={styles.map} region={mapRegion}>
				<Marker coordinate={mapRegion} title="Marker" />
			</MapView>
			<View>
				<Text style={styles.paragraph}>your location is :{text}</Text>
			</View>
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	map: {
		width: '80%',
		height: '50%',
	},
	containerd2: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	paragraph: {
		fontSize: 18,
		textAlign: 'center',
	},
});
