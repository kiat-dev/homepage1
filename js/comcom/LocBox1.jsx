import React from 'react';
import Mapir from 'mapir-react-component';
import 'mapir-react-component/dist/index.css';

const MapComponent = () => {
    const map = Mapir.setToken({
        transformRequest: (url) => {
            return {
                url: url,
                headers: {
                    'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE1NWM0OGExOTQ1ZWVhNzU4ZGVkNjY2NTNiNjExZWIxM2NiMzRkOGE1Nzc4OTJiZWJjZWQ3Y2IxODI4M2Y5MmY2YTQyMGQ4MGYxYTk0NGNiIn0.eyJhdWQiOiIzNDc3OCIsImp0aSI6ImE1NWM0OGExOTQ1ZWVhNzU4ZGVkNjY2NTNiNjExZWIxM2NiMzRkOGE1Nzc4OTJiZWJjZWQ3Y2IxODI4M2Y5MmY2YTQyMGQ4MGYxYTk0NGNiIiwiaWF0IjoxNzYwMTI5NTk3LCJuYmYiOjE3NjAxMjk1OTcsImV4cCI6MTc2MjYzNTE5Nywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.T0moBfIKMFd71zwI-ioCLBwIZZidMf1A8uL6gmN2M-AU98m-PcAOPKMFvEsRd1sZ8w9cWwacUx2K8eZA4d499rO3prFhLRLhUk3oZZh5qrJ4zM0nTxWUlsZDjYx9QK28F2hYo7npPLMwSMMBnznxCWWXf3nwE87UkXdH9UjnoWgBTqrsDoDi2tkP-g7pmbVtKwLLQ7bStxYQlSikH0XzITE91UAF3pl-t-4yB3DE9NE3fjdI20Ye7O3aJXHgwEHxnaMnc0KWkiTgmWF9vglNtGmZIR4tX8GXn8Vw170ORcx_piP6-KaU31ArsR6vOxTi9NlLF7vXHwX_SXmQGxZtbQ', // Replace with your Map.ir API key
                    'Mapir-SDK': 'reactjs',
                },
            };
        },
    });

    return (
        <Mapir.Map
            map={map}
            center={[51.3890, 35.6892]} // Longitude, Latitude for Tehran
            zoom={12}
            style="mapir://styles/mapir/streets-v2"
            containerStyle={{
                width: '100%',
                height: '400px',
            }}
        >
            <Mapir.Marker
                anchor="bottom"
                offset={[0, -25]}
                position={[51.3890, 35.6892]}
            />
        </Mapir.Map>
    );
};

export default MapComponent;
