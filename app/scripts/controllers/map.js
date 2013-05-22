BookCrossingApp.controller('MapCtrl', function($scope, geolocationService, dataService) {
    var geoPoint;
    var myPositionIcon = "styles/img/myPosition.gif";
    var bookIcon = "styles/img/book.png";
    var zobcIcon = "styles/img/zobc.png";

    $scope.myMarkers = [];
    $scope.books = [];

    $scope.book = {
        id: "1",
        title: "Test book x",
        content: "released by ",
        image: bookIcon,
        user: "Marc",
        time:"8 seg"
    };

    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.addMarker = function($event) {
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: $event.latLng
        }));
    };

    $scope.setZoomMessage = function(zoom) {
        $scope.zoomMessage = 'You just zoomed to '+zoom+'!';
        console.log(zoom,'zoomed');
    };

    function getId(array, id) {
        var obj = array.filter(function (val) {
            return val.id === id;
        });
        //filter returns an array, and we just want the matching item
        return obj[0];
    }

    $scope.openMarkerInfo = function(marker) {

        $scope.book = getId($scope.books, marker.title);
        $scope.currentMarker = marker;
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function(marker, lat, lng) {
        marker.setPosition(new google.maps.LatLng(lat, lng));
    };

    geolocationService.getCurrentPosition(function (position) {
                geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};

                    if (geoPoint!=null){

                        var marker = new google.maps.Marker({
                            map: $scope.myMap,
                            position: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
                            title: "Me",
                            icon:myPositionIcon
                        });

                        $scope.myMarkers.push(marker);

                        $scope.myMap.setCenter(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));

}

});

    $scope.getActPage = function (pageNumber) {
        dataService.getActionsPage(pageNumber, function (results) {
            $scope.$apply(function () {
                //TODO: Load only the released books arround x km
                $scope.actionList = results;
                for (var i=0;i<results.length;i++)
                {
                    var action = results[i];
                    var book = action.get('bookPointer');
                    var actionType = action.get('actionTypePointer');
                    var user = action.get('userPointer');

                    var title = "not defined";
                    var description = "not defined";
                    var username = "not defined";
                    var image = "not defined";
                    var time;
                    //TODO: Move in a directive?

                    var seconds = Math.round((new Date()-action.createdAt)/1000);
                    var minutes = Math.round(seconds/60);
                    var hours = Math.round(minutes/60);
                    var days = Math.round(hours/24);

                    if(seconds < 60)
                        time = seconds + ' sec';
                    else if(minutes < 60)
                        time = minutes + ' min';
                    else if(hours < 24)
                        time = hours + ' hours';
                    else
                        time = days + ' days';

                    if (book != null)
                    {
                        title = book.get('title');
                        image = book.get('image');
                    }
                    if (actionType != null)
                        description = actionType.get('description');

                    if (user != null)
                        username = user.get('nick');

                    if (actionType != null){
                        var typeId = actionType.get('description');

                        //TODO: User localization here!!!!
                        switch(typeId){
                            case 'registered':
                                description= "has been registered by ";
                                break;
                            case 'joined':
                                description= "has been joined by ";
                                break;
                            case 'locked':
                                description= "has been locked by ";
                                break;
                            case 'released':
                                description= "has been released around you by ";
                            default:
                                description= typeId + " " + username;
                                break;
                        }
                    }


                    $scope.newbook = {
                        id: book.id,
                        title: title,
                        //TODO: Add localization
                        content: description,
                        image: image,
                        user: username,
                        time:time
                    };
                    $scope.books.push($scope.newbook);


                    var bookMarker = new google.maps.Marker({
                        map: $scope.myMap,
                        position: new google.maps.LatLng(41,37, 2.12),
                        title: book.id,
                        icon:bookIcon
                    });

                    $scope.myMarkers.push(bookMarker);
                }
            });
        });
    };


    $scope.getActPage(0);



});