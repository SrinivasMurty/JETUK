angular.module('starter.controllers', [])
.service("rssServiceData",function(){
  this.staticFeedData;
  this.setRssFeed = function(data){
    this.staticFeedData = data;
  }
  this.getFeedData = function(){
    return this.staticFeedData;
  }
})
.factory('rssService', function($http,$q) {
        
        var entries;

        return {

            getEntries: function(url,reload) {
                var deferred = $q.defer();
                console.log('getEntries for '+url);
                if(entries && !reload) {
                    console.log('from cache');
                    deferred.resolve(entries);
                } else {
					

                    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'https%3A%2F%2Fwww.jetuk.org%2Fjetuk-rss.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
            .then(function(results) {
                        console.log('googles init called');
                        
						entries = results.data.query.results;
						deferred.resolve(entries);
                        

                    },function error(d){
						console.log(d);
					});

                }
                return deferred.promise;
            }

        };
    })
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPlatform,$rootScope,rssService,rssServiceData) {

  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	$ionicPlatform.ready(function() {

        //console.log("Started up!!");
        //console.log(Media);
        //if($cordovaNetwork.isOnline()) {
            rssService.getEntries('https://www.jetuk.org/jetuk-rss.xml',true).then(function(entries) {
                rssServiceData.setRssFeed(entries.rss.channel)
                $rootScope.entries = entries;
                //$location.path('/entries');
            });

        //} else {
            //console.log("offline, push to error");
            //$ionicLoading.hide();
            //$location.path('/offline');
        //}

    });
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller("eventController", function($scope,$rootScope,rssService,rssServiceData){

  $scope.doRefresh = function(){
    rssService.getEntries('https://www.jetuk.org/jetuk-rss.xml',true).then(function(entries) {
                rssServiceData.setRssFeed(entries.rss.channel)
                //$rootScope.entries = entries;
                $scope.eventList = rssServiceData.getFeedData().item;
                //$location.path('/entries');
                $scope.$broadcast('scroll.refreshComplete');
    
                 
            });
  }
  $scope.$watch('rssServiceData.getFeedData()',function(nval,oldVal){
    if(rssServiceData.getFeedData()){
      $scope.eventList = rssServiceData.getFeedData().item;
    }
  });
	
})

.controller('playlistController', function($scope, $stateParams,MediaManager) {
  $scope.dynamicTrack = {};   // we use this scope variable to dynamically assign a track

    $scope.track = 
      {
            url: '/android_asset/www/audio/haryashtakam.mp3', // audio file stored in device's app folder
            artist: 'Prahaladha',
            title: 'Haryashtakam'
        };
    //     {
    //         url: 'http://www.prapatti.com/slokas/mp3/devaraajapanchakam.mp3',  // audio file from the cloud
    //         artist: 'Doddaiyaachar',
    //         title: 'Devaraaja Panchakam'
    //     }
        
    // ];

    $scope.stopPlayback = function() {
        MediaManager.stop();  // will stop any audio currently playing
    };

    $scope.playTrack = function(index) {
        $scope.dynamicTrack = $scope.tracks[index];   // assign one track

        $scope.togglePlayback = !$scope.togglePlayback; // start playback when track changes    
    };
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
