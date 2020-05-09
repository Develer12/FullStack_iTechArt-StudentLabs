let myMap;

let initMap = () => {
    ymaps.ready(() => {
        myMap = new ymaps.Map('map', {
            center: [53.753994, 27.622093],
            zoom: 9
        });
    });
    searchAddress();
};

let searchAddress = () => {
    if(mapAddress){
        console.log(`${mapAddress.country} ${mapAddress.region} ${mapAddress.address}`)

        ymaps.geocode(`${mapAddress.country} ${mapAddress.region} ${mapAddress.address}`, { 
            results: 1,
            kind: 'street'
        })
        .then((res) => {
            let firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates(),
                bounds = firstGeoObject.properties.get('boundedBy');
    
            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
    
            myMap.geoObjects.add(firstGeoObject);
            myMap.setBounds(bounds, {
                checkZoomRange: true
            });
        });
    }   
};