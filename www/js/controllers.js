angular.module('starter.controllers', ['ngCordova'])
.service("rssServiceData",function(){
  this.staticFeedDataEvents;
  this.setRssFeedEvents = function(data){
    if(data){
      window.localStorage["eventsRss"] = JSON.stringify(data);
    }
    this.staticFeedDataEvents = data;
  }
  this.getFeedDataEvents = function(){
    if(window.localStorage["eventsRss"])
       return JSON.parse(window.localStorage["eventsRss"]);
    return this.staticFeedDataEvents;
  }
  this.staticFeedDataDates;
  this.setRssFeedDates = function(data){
    if(data){
      window.localStorage["datesRss"] = JSON.stringify(data);
    }
    this.staticFeedDataDates = data;
  }
  this.getFeedDataDates = function(){
    if(window.localStorage["datesRss"])
       return JSON.parse(window.localStorage["datesRss"]);
    return this.staticFeedDataDates;
  }
  this.staticFeedDataDiscourses;
  this.setRssFeedDiscourses = function(data){
    if(data){
      window.localStorage["discourceRss"] = JSON.stringify(data);
    }
    this.staticFeedDataDiscourses = data;
  }
  this.getFeedDataDiscourses = function(){
    if(window.localStorage["discourceRss"])
       return JSON.parse(window.localStorage["discourceRss"]);
    return this.staticFeedDataDiscourses;
  }
  this.staticFeedDataVideos;
  this.setRssFeedVideos = function(data){
    if(data){
      window.localStorage["videosRss"] = JSON.stringify(data);
    }
    this.staticFeedDataVideos = data;
  }
  this.getFeedDataVideos = function(){
    if(window.localStorage["videosRss"])
       return JSON.parse(window.localStorage["videosRss"]);
    return this.staticFeedDataVideos;
  }
})
.factory('rssService', function($http,$q) {
        var entries;
        return {

            getEntries: function(url,reload) {
                var deferred = $q.defer();
                if(entries && !reload) {
                    deferred.resolve(entries);
                } else {
					

                    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'"+ url +"'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
            .then(function(results) {
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

    rssService.getEntries('https://www.jetuk.org/ach/jetuk-updates.xml',true).then(function(entries) {
            rssServiceData.setRssFeedEvents(entries.rss.channel)
            $rootScope.entries = entries;
        });
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
.controller("homeController",function($scope){
  $scope.openUrl = function(url){
    window.open(url,"_blank","location=yes");
    }
})
.controller("eventController", function($scope,$rootScope,rssService,rssServiceData){

  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-updates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedEvents(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataEvents().item;
            });
});
  $scope.doRefresh = function(){
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-updates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedEvents(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataEvents().item;
                $scope.$broadcast('scroll.refreshComplete');
            });
  }
  $scope.$watch('rssServiceData.getFeedDataEvents()',function(nval,oldVal){
    if(rssServiceData.getFeedDataEvents()){
      $scope.eventList = rssServiceData.getFeedDataEvents().item;
    }
  });
})
.controller('priestController',function($scope){
  $scope.openUrl = function(url){
    window.open(url,"_blank","location=yes");
  }
})
.controller('slokasController', function($scope,$window) {
  var vm = this;
  $scope.sendEmail = sendEmail;
    var slokas = [{ title: "Haryastakam", key: "HARI"},
  {title: "Krishnastakam" ,key:"KRISHNA"},{title: "Adityahrdhayam" ,key:"AADITYA"}]
  $scope.slokas = slokas;
  function sendEmail() {
  // if ($window.plugins && $window.plugins.emailComposer) { //check if plugin exists

  //   $window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
  //       //console.log("Email sent successfully");
  //     },

  //     'Acharya-Beta - Test Email',        // Subject
  //     'How are you? Nice greetings from JETUK',        // Body
  //     ['rajamohanrnd@gmail.com'],     // To (Email to send)
  //     'jetuk.seva@gmail.com',        // CC
  //     null,        // BCC
  //     true,       // isHTML
  //     null,        // Attachments
  //     null);       // Attachment Data
  // }
  }

  var email = {
    to: 'rajamohanrnd@gmail.com',
    cc: 'jetuk.seva@gmail.com',
    //bcc: ['john@doe.com', 'jane@doe.com'],
    
    subject: 'Acharya-Beta - Test Email',
    body: 'How are you? Nice greetings from JETUK',
    isHtml: true
  };


})
.controller("ekadasiController",function($scope,$rootScope,rssService,rssServiceData){
  rssService.getEntries('https://www.jetuk.org/ach/jetuk-ekadasidates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDates(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataDates().item;
            });
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-ekadasidates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDates(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataDates().item;
            });
});
           $scope.$watch('rssServiceData.getFeedDataDates()',function(nval,oldVal){
    if(rssServiceData.getFeedDataDates()){
      $scope.eventList = rssServiceData.getFeedDataDates().item;
    }
  });
})
.controller("videoController",function($scope,$rootScope,rssService,rssServiceData){
  rssService.getEntries('https://www.jetuk.org/ach/jetuk-videos.xml',true).then(function(entries) {
                rssServiceData.setRssFeedVideos(entries.rss.channel)
                var videos = rssServiceData.getFeedDataVideos().item;
                for (var index = 0; index < videos.length; index++) {
                  var element = videos[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  videos[index].link = link;
                }
                $scope.videos = videos;
            });
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-videos.xml',true).then(function(entries) {
                rssServiceData.setRssFeedVideos(entries.rss.channel)
                var videos = rssServiceData.getFeedDataVideos().item;
                for (var index = 0; index < videos.length; index++) {
                  var element = videos[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  videos[index].link = link;
                }
                $scope.videos = videos;
            });
});
           $scope.$watch('rssServiceData.getFeedDataVideos()',function(nval,oldVal){
    if(rssServiceData.getFeedDataVideos()){
      $scope.videos = rssServiceData.getFeedDataVideos().item;
    }
  });
})
.controller("discoursesController",function($scope,$sce,rssService,rssServiceData){
  
   function trustSrc(src) {
    return $sce.trustAsResourceUrl(src).toString();
  }
  
  rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDiscourses(entries.rss.channel)
                var discourses = rssServiceData.getFeedDataDiscourses().item;
                for (var index = 0; index < discourses.length; index++) {
                  var element = discourses[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
                }
                $scope.discourses = discourses;
                
            });
             
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDiscourses(entries.rss.channel)
                var discourses = rssServiceData.getFeedDataDiscourses().item;
                for (var index = 0; index < discourses.length; index++) {
                  var element = discourses[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
                }
                $scope.discourses = discourses;
            });
  });
          $scope.$on('$ionicView.leave', function(ev) {
          });
          $scope.$on('$ionicNavView.enter',function(ev){
               if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDiscourses(entries.rss.channel)
                var discourses = rssServiceData.getFeedDataDiscourses().item;
                for (var index = 0; index < discourses.length; index++) {
                  var element = discourses[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
                }
                $scope.discourses = discourses;
            });
          });
  $scope.$watch('rssServiceData.getFeedDataDiscourses()',function(nval,oldVal){
    if(rssServiceData.getFeedDataDiscourses()){
      $scope.discourses = rssServiceData.getFeedDataDiscourses().item;
      $scope.testLink = $sce.trustAsResourceUrl($scope.discourses[0].link).toString();
    }
  });
})
.controller('slokaController', function($scope,$state, $stateParams) {
  var vm = this;
  $scope.onlanguageChange = onlanguageChange;
    var slokas = [
      {
        key:"HARI",
        title: "Hari Ashtakam",
        artist:"Prahaladha",
        url:"/android_asset/www/audio/haryashtakam.mp3",
        sloka:[{lang:"en",
         items: [{ text: "harirharati pApAni duShtacittairapi smruta: |",index: "1" },{ text: "anicchayApi samspruShto dahatyevahi pAvaka: || ", index:"2" },{ text: "sa gangA sa gayA setu: sa kAshi sa ca puShkaram |", index:"3"  },{ text: "jihvAgre vartate yasya harirityaksharadvayam ||", index:"2"  }]
      },
        {lang:"ta",
         items: [{ text: "हरिर्हरति पापानि दुष्टचित्तैरपि स्मृत: ।",index: "1" },{ text: "अनिच्छयाऽपि संस्पृष्टो दहत्येवहि पावक: ॥", index:"2" },{ text: "स गङ्गा स गया सेतु: स काशी स च पुष्करम् ।", index:"3"  },{ text: "जिह्वाग्रे वर्तते यस्य हरिरित्यक्षर द्वयम् ॥", index:"2"  }]
      },
        {lang:"te",
         items: [{ text: "Line 1",index: "1" },{ text: "Line 2", index:"2" },{ text: "Line 3", index:"3"  },{ text: "Line 4", index:"2"  }]
      }
      ]
      },
    {
        key:"KRISHNA",
        title: "Krishnastakam",
        artist:"Adi Shankara",
        url:"http://www.prapatti.com/slokas/mp3/krishnamvande.mp3",
        sloka:[{lang:"en",
         items: [{ text: "Line 1",index: "1" },{ text: "Line 2", index:"2" },{ text: "Line 3", index:"3"  },{ text: "Line 4", index:"2"  }]
      },
        {lang:"ta",
         items: [{ text: "Line 1",index: "1" },{ text: "Line 2", index:"2" },{ text: "Line 3", index:"3"  },{ text: "Line 4", index:"2"  }]
      },
        {lang:"te",
         items: [{ text: "Line 1",index: "1" },{ text: "Line 2", index:"2" },{ text: "Line 3", index:"3"  },{ text: "Line 4", index:"2"  }]
      }
      ]
      },
    {
        key:"AADITYA",
        title: "Adityahrdhayam",
        artist:"Agastyar",
        url:"http://www.prapatti.com/slokas/mp3/aadityahrudayam.mp3",
        sloka:[{lang:"en",
         items: [{ text: "Line 1",index: "1" },{ text: "Line 2", index:"2" },{ text: "Line 3", index:"3"  },{ text: "Line 4", index:"2"  }]
      },
        {lang:"ta",
         items: [{ text: "Line 1 Tamil",index: "1" },{ text: "Line 2", index:"2" },{ text: "Line 3", index:"3"  },{ text: "Line 4", index:"2"  }]
      },
        {lang:"te",
         items: [{ text: "Line 1 Telegu",index: "1" },{ text: "Line 2", index:"2" },{ text: "Line 3", index:"3"  },{ text: "Line 4", index:"2"  }]
      }
      ]
      }

    ];
    //$scope.dynamicTrack = {};
    $scope.options = [{ code:"en",text:"English"},{code:"ta",text:"Tamil"},{code:"te",text:"Telegu"}];
    $scope.lang = $scope.options[0];//{ code:"en",text:"English"};
    //$scope.selectedLang = {};
    $scope.title = $stateParams.key; 
    $scope.selectedSloka = slokas.filter(function(d){
        if(d.key === $stateParams.key)
          return true;
        return false;
    });
      if($scope.selectedSloka[0]){
       $scope.slokaText =  $scope.selectedSloka[0].sloka.filter(function(d){
        if(d.lang === "en")
          return true;
        return false;
     })[0];
      }
      //refreshText($scope.selectedLang);
      function refreshText(newVal,oldVal){
        if(newVal === oldVal) return;
          $scope.slokaText =  $scope.selectedSloka[0].sloka.filter(function(d){
        if(d.lang === newVal.code)
          return true;
        return false;
     })[0];
      }
      function onlanguageChange(lang){
        //vm.selectedLang = val;
        //var cc = $scope.lang.code;
        refreshText(lang);
    }
      if($scope.selectedSloka[0]){
     $scope.dynamicTrack = { url: $scope.selectedSloka[0].url, 
            artist: $scope.selectedSloka[0].artist,
            title: $scope.selectedSloka[0].title };   // assign one track
      }
     $scope.togglePlayback = !$scope.togglePlayback;
    
      //$scope.$watch(function(){return $scope.lang},refreshText);
})
.controller('playlistController', function($scope, $stateParams,MediaManager) {
  $scope.dynamicTrack = {};   // we use this scope variable to dynamically assign a track
    $scope.tracks = [
      {
        url: '/android_asset/www/audio/haryashtakam.mp3', // audio file stored in device's app folder
            artist: 'Prahaladha',
            title: 'Haryashtakam',
            index:0
      },
          {
            url: 'http://www.prapatti.com/slokas/mp3/aadityahrudayam.mp3', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Aadityahrudayam',
            index:1
          }
    ]
    $scope.track = 
      {
            url: 'http://www.prapatti.com/slokas/mp3/aadityahrudayam.mp3', // audio file stored in device's app folder
            artist: 'Prahaladha',
            title: 'Haryashtakam'
        };
          
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
