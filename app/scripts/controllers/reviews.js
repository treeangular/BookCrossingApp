BookCrossingApp.controller('ReviewsCtrl', function ($scope, $rootScope, dataService, $q) {

    var star = "styles/img/blankstar.png";
    var selectedStar = "styles/img/selectedstar.png";

    var user1 = {
        nick: "Marc",
        image: "styles/img/user.png"
    }

    $scope.reviews = [
        {
            id:1,
            user: user1,
            content: "Absolutely amazing. Just as with Persepolis 2, I had to devour the entire book in one sitting. I have several Iranian friends, one of whom left Iran during the early 80's and her son's name is the same as one of Satrapi's friends that fled.",
            rate: 4,
            like: 10,
            unlike: 2,
            createdAt: new Date("June 20, 2013 01:15:00")
        },
        {
            id:2,
            user: user1,
            content: "I think this is will be more response than review. Satrapi's Persepolis fulfills its purpose as a memoir, but I will tell you right from the start, that it is indeed overhyped, particularly if you have read the rave critical reviews. Perhaps, since the field of graphic novels as memoirs is relatively new, a work like this could be called ground-breaking. Persepolis as a memoir is an interesting read. I say this only as a result of having read Part Two of this book, The Story of a Return . If I had read The Story of a Childhood alone, I probably would not have liked this book at all. ",
            rate: 2,
            like: 70,
            unlike: 2,
            createdAt: new Date("June 20, 2013 01:15:00")
        },
        {
            id:3,
            user: user1,
            content: "I loved this book! So I will vote for 5 starts.",
            rate: 5,
            like: 0,
            unlike: 0,
            createdAt: new Date("June 20, 2013 01:15:00")
        },
        {
            id:4,
            user: user1,
            content: "I don't know what to call Persepolis. It's a graphic novel, of course, but it's also an autobiography and a history and a social commentary. Marjane Satrapi takes an honest and sometimes severe look at her childhood, teenage years, and early 20s. Her graphics are striking and tell as much of the story as her words. Sometimes I became so engrossed that I had to force myself to step back a bit and remember that I was reading someone's history -- that Satrapi had lived and survived the heartbreaking situations she was depicting. ",
            rate: 1,
            like: 3,
            unlike: 1,
            createdAt: new Date("June 20, 2013 01:15:00")
        }


    ];


    $scope.like  = function(reviewId) {
        //TODO: Update like in the database


    }

    $scope.unlike  = function(reviewId) {
        //TODO: Update Unlike in the database


    }



    $scope.nextPage  = function() {
        //TODO: Load Next Pages
    };
});
