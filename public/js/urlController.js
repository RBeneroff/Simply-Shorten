(function() {
  angular
    .module('Site')
    .controller('SiteController', SiteController)

    function SiteController($scope, $http, $state) {
      var self = this;
      var urls = [];

      function getUrls() {
        $http.get('/urls')
        .then(function(response) {
          self.urls = response.data.urls;
          // console.log(response.data)
        })
        .catch(function(err) {
          console.log('error', err)
        })
      }
      getUrls()

      this.shortenUrl = function(longUrl, origin, newUrl) {
        var newUrl = '';
        var urlObj = '';
        return $http({
          url: "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDyo_ZNPgLhmKEHYT7elKV7_58-yBFlvlk",
          method: 'POST',
          data: {longUrl : longUrl, origin : origin, newUrl : newUrl}
        })
        .then(function(response) {
          newUrl = response.data.id;
          // console.log(response, 'with URLs in it');
          // console.log('long URL --->', longUrl, 'from:', origin, 'short URL --->', newUrl);
          urlObj = {
            longUrl: longUrl,
            newUrl: newUrl,
            origin: origin
          }
          console.log('urlObj contains --->', urlObj);
          $http.post('/urls', urlObj)
          .then(function(response) {
            console.log(urlObj, 'after saving')
            console.log(urlObj.newUrl)
            // longUrl.input = '';
            // origin.input = '';
          })
          .catch(function(err) {
            console.log('error', err)
          });
        })
      }

      function updateUrl(url) {
        console.log('clicking udpate', url);
        $http.put(`/urls/${url._id}`, url)
        .then(function(response) {
          console.log(response, 'what is saving to db');
        })
      }

      function removeUrl(url) {
        console.log('clicked')
        $http.delete(`/urls/${url._id}`, url)
        .then(function(response) {
          console.log(response);
          self.url = response.data.url;
        })
      }

      function clearHistory(urls) {
        console.log('clearing');
        $http.delete('/urls', urls)
      }

      this.updateUrl = updateUrl;
      this.removeUrl = removeUrl;
      this.clearHistory = clearHistory;

    } //SiteController
})() //IIFE


// UNUSED CODE

// function addUrl(longUrl, origin, newUrl) {
//   // self.newUrl = response.data.id;
//   console.log('add to db --->', longUrl, origin, newUrl)
//   $http.post('/', longUrl, origin, newUrl)
//   .then(function(response) {
//     console.log(response)
//     self.urls = response.data.urls;
//     longUrl.input = '';
//   })
//   .then(function(response) {
//     if (response.data.status === 200) {
//       self.urls.push(urlObj);
//     }
//   })
//   .catch(function(err) {
//     console.log('error', err)
//   });
// }
