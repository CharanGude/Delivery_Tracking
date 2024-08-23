import React, { useState, useEffect } from 'react';
import './index.css';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { FaPhoneAlt } from 'react-icons/fa';

const TrackingPage = () => {
  const [orderStatus, setOrderStatus] = useState('preparing'); // 'preparing', 'assigned', 'inTransit', 'arrived'
  // const [directions, setDirections] = useState(null);
  const [icons, setIcons] = useState({});

  const mapStyles = {
    height: '300px',
    width: '100%',
  };

  const customMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        { "color": "#ffffff" } // White background
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#616161" } // Darker text color for better visibility
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        { "color": "#f5f5f5" } // Light stroke color for labels
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        { "color": "#d6d6d6" } // Light grey for roads
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#c0c0c0" } // Slightly darker stroke for roads
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#b4d4e1" } // Light blue for water
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        { "color": "#e0e0e0" } // Light grey for transit lines
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "color": "#e0e0e0" } // Light grey for points of interest
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        { "color": "#e0e0e0" } // Light grey for administrative boundaries
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        { "color": "#f0f0f0" } // Light grey for landscape
      ]
    }
  ];

  const currentLocation = {
    lat: 17.3850,  // Example coordinates (Hyderabad)
    lng: 78.4867,
  };

  const restaurantLocation = {
    lat: 17.4220,  // Example coordinates (Hyderabad, Banjara Hills)
    lng: 78.4486,
  };

  const deliveryPartnerLocation = {
    lat: 17.4401,  // Example coordinates (Hyderabad, Jubilee Hills)
    lng: 78.4346,
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      const homeIcon = {
        url: 'https://img.icons8.com/ios-filled/50/000000/home.png',
        scaledSize: new window.google.maps.Size(40, 40),
      };

      const foodIcon = {
        url: 'https://img.icons8.com/ios-filled/50/000000/restaurant.png',
        scaledSize: new window.google.maps.Size(40, 40),
      };

      const bikeIcon = {
        url: 'https://img.icons8.com/ios-filled/50/000000/motorbike-delivery.png',
        scaledSize: new window.google.maps.Size(40, 40),
      };

      setIcons({ homeIcon, foodIcon, bikeIcon });
    }
  }, []);

  // Simulate the order process with timing
  useEffect(() => {
    const simulateSteps = () => {
      setTimeout(() => {
        setOrderStatus('assigned');
        setTimeout(() => {
          setOrderStatus('inTransit');
          //const directionsService = new window.google.maps.DirectionsService();
          /*directionsService.route(
            {
              origin: deliveryPartnerLocation,
              destination: currentLocation,
              travelMode: window.google.maps.TravelMode.DRIVING,
              optimizeWaypoints: true,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error('Error fetching directions:', status);
                console.error('Result object:', result);
              }
            }
          );*/
          
          setTimeout(() => {
            setOrderStatus('arrived');
          }, 5000);
        }, 5000);
      }, 5000);
    };

    simulateSteps();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Deliveryan</h1>
      </header>
      <div>
      <h2>Order Status</h2>
        <p>
          {orderStatus === 'preparing' && 'Your order is being prepared by the restaurant.'}
          {orderStatus === 'assigned' && 'A delivery partner has been assigned. Waiting for pickup.'}
          {orderStatus === 'inTransit' && 'Your order is on the way!'}
          {orderStatus === 'arrived' && 'Your delivery partner has arrived at your location!'}
        </p> 
      </div>

      <section className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyDKL-xZj_dWiUyYKa8UurCxtD3uqx6Q_KI">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={14}
            center={orderStatus === 'preparing' ? currentLocation : deliveryPartnerLocation}
            options={{ styles: customMapStyle, disableDefaultUI: true }}
          >
            <Marker 
              position={restaurantLocation} 
              icon={icons.foodIcon}
            />
            <Marker 
              position={currentLocation} 
              icon={icons.homeIcon} 
            />
            {orderStatus === 'assigned' && (
              <Marker 
                position={deliveryPartnerLocation} 
                icon={icons.bikeIcon} 
              />
            )}
            {/*orderStatus === 'inTransit' && directions && (
              <DirectionsRenderer directions={directions} />
            )*/}
          </GoogleMap>
        </LoadScript>
      </section>

      <section className="details-container">
        
        {orderStatus !== 'preparing' && (
          <div className='delivery-partner-container'>
            <h4>Your Delivery Partner is:</h4>
            <div className="delivery-partner-info">
              <img 
                src="https://via.placeholder.com/50"  // Placeholder image
                alt="Delivery Partner"
                className="partner-image"
              />
              <p className="partner-name">John Doe</p>
            </div>
            <div className="contact-info">
              <FaPhoneAlt className="phone-icon" />
              <p>+123 456 7890</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TrackingPage;
