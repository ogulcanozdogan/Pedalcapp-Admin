import React, { useCallback, useMemo, useState } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	DirectionsRenderer,
	DirectionsService,
} from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '400px',
};

function Map({
	pickupAddressLatLng,
	destinationAddressLatLng,
	pickupAddress,
	destinationAddress,
}) {
	let [directionsResponse, setDirectionsResponse] = useState(null);
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyBg9HV0g-8ddiAHH6n2s_0nXOwHIk2f1DY',
	});

	const [response, setResponse] = useState(null);
	const [center, setCenter] = useState({ lat: 0, lng: 0 });

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback() {
		setMap(null);
	}, []);

	const directionsResult = useMemo(() => {
		return {
			directions: directionsResponse,
		};
	}, [directionsResponse]);

	const directionsCallback = useCallback((result, status) => {
		if (result !== null) {
			if (status === 'OK') {
				setDirectionsResponse(result);
			}
		}
	}, []);

	const getShortestDirectionIdx = directions => {
		let routes = directions.routes;
		let idx = 0;
		let shortestRouteIdx = 0;
		let minDuration = Number.MAX_VALUE;
		for (let route of routes) {
			for (let leg of route.legs) {
				if (minDuration > leg?.duration?.value) {
					minDuration = leg?.duration?.value;
					shortestRouteIdx = idx;
				}
			}
			idx++;
		}

		return shortestRouteIdx;
	};
	function getNextSunday() {
		let today = new Date();
		let dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

		// Calculate the number of days until the next Sunday
		let daysUntilNextSunday = 7 - dayOfWeek;

		// Adjust for the case where today is already Sunday
		if (dayOfWeek === 0) {
			daysUntilNextSunday = 7;
		}

		// Set the date to the next Sunday
		let nextSunday = new Date(today);
		nextSunday.setDate(today.getDate() + daysUntilNextSunday);
		nextSunday.setHours(11, 0, 0, 0);
		return nextSunday;
	}

	const directionsOptions = useMemo(() => {
		return {
			destination: destinationAddress,
			origin: pickupAddress,
			drivingOptions: {
				trafficModel: 'optimistic',
				departureTime: getNextSunday(),
			},
			travelMode: 'bicycling',
			provideRouteAlternatives: true,
		};
	}, [destinationAddress, pickupAddress]);
	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={{
				lat:
					(pickupAddressLatLng.lat + destinationAddressLatLng.lat) /
					2,
				lng:
					(pickupAddressLatLng.lng + destinationAddressLatLng.lng) /
					2,
			}}
			zoom={11.5}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			<DirectionsService
				options={directionsOptions}
				callback={directionsCallback}
			/>
			{directionsResult.directions && (
				<DirectionsRenderer
					directions={directionsResult.directions}
					routeIndex={getShortestDirectionIdx(
						directionsResult.directions
					)}
					options={{
						polylineOptions: {
							strokeColor: 'red',
							strokeOpacity: 0.7,
							strokeWeight: 6,
						},
						suppressMarkers: true,
						suppressBicyclingLayer: true,
					}}
				/>
			)}
			<Marker position={pickupAddressLatLng} label='A' />
			<Marker position={destinationAddressLatLng} label='B' />
		</GoogleMap>
	) : (
		<></>
	);
}

export default React.memo(Map);
