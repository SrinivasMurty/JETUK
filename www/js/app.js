// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ionic-audio'])

.run(function($ionicPlatform) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
   .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeController'
      }
    }
  })
   .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutus.html'
      }
    }
  })
   .state('app.statueofequality', {
    url: '/statueofequality',
    views: {
      'menuContent': {
        templateUrl: 'templates/statueofequality.html'
      }
    }
  })

  .state('app.calender', {
    url: '/calender',
    views: {
      'menuContent': {
        templateUrl: 'templates/calender.html'
      }
    }
  })
  .state('app.feedback', {
    url: '/feedback',
    views: {
      'menuContent': {
        templateUrl: 'templates/feedback.html'
      }
    }
  })
   .state('app.faqs', {
    url: '/faqs',
    views: {
      'menuContent': {
        templateUrl: 'templates/faqs.html'
      }
    }
  })
   .state('app.starbirth', {
    url: '/starbirth',
    views: {
      'menuContent': {
        templateUrl: 'templates/starbirth.html'
      }
    }
  })
  .state('app.priest', {
    url: '/priest',
    views: {
      'menuContent': {
        templateUrl: 'templates/priest.html',
        controller: 'priestController'
      }
    }
  })

   .state('app.contactus', {
    url: '/contactus',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactus.html'
      }
    }
  })
     .state('app.donate', {
    url: '/donate',
    views: {
      'menuContent': {
        templateUrl: 'templates/donate.html'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  // .state('app.browse', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/browse.html',
	// 	      controller: 'eventController'
  //       }
  //     }
  //   })
	//  .state('app.english', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/english.html'
  //       }
  //     }
  //   })
	//  .state('app.Tamil', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/Tamil.html'
  //       }
  //     }
  //   })
	//  .state('app.Telugu', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/Telugu.html'
  //       }
  //     }
  //   })
	 .state('app.event', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'eventController'
        }
      }
    })
    .state('app.slokas', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/slokas.html',
          controller: 'slokasController'
        }
      }
    })
	 .state('app.discourses', {
      url: '/playlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'playlistController'
        }
      }
    })
	.state('app.more', {
            url: '/more',
            views: {
                'menuContent': {
                    templateUrl: 'templates/more.html'
                }
            }
        })
        .state('app.live', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/live.html'
                }
            }
        });
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});



angular.module('ionicApp', ['ionic', 'ionic.rating'])

.controller('MainCtrl', function($scope) {

  $scope.ratingFull = {};
  $scope.ratingFull.rate = 3;
  $scope.ratingFull.max = 5;
  
  $scope.ratingHalf = {};
  $scope.ratingHalf.rate = 3.5;
  $scope.ratingHalf.max = 5;
  
  $scope.reset = function(){
    $scope.ratingFull.rate = 0;
  }
});




var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .donate("/", {
        templateUrl : "donate.html"
    })
});





