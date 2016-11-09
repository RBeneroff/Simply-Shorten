(function() {
  angular
    .module('Site')
    .controller('SiteController', SiteController)

    function SiteController($scope, $http) {
      var self = this;
      var url = [];

      function getUrls() {
        $http.get('/urls')
        .then(function(response) {
          self.urls = response.data.urls;
        })
        .catch(function(err) {
          console.log('error', err)
        })
      }

      this.shortenUrl = function(longUrl) {
        console.log('long URL --->', longUrl);
        return $http({
          url: "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDyo_ZNPgLhmKEHYT7elKV7_58-yBFlvlk" ,
          method: 'POST',
          // contentType: 'application/json',
          data: {longUrl : longUrl}
        })
        .then(function(response) {
          console.log(response);
          console.log('short URL --->', response.data.id);
        })
        // .then(function(response) {
        //   if (response.data.status === 200) {
        //     self.urls.push(longUrl);
        //   }
        // })
      }

      function addUrl(newUrl) {
        console.log('shorten')
        $http.post('/urls', newUrl)
        .then(function(response) {
          self.urls = response.data.urls;
          newUrl.input = '';
        })
        .catch(function(err) {
          console.log('error', err)
        });
      }

      function updateUrl(url) {
        $http.put(`/urls/${url._id}`, url)
        .then(function(response) {
          console.log(response);
          self.url = response.data.url;
        })
      }

      function removeUrl(id) {
        console.log('clicked')
        $http.delete(`/urls/${id}`)
        .then(function(response) {
          console.log(response);
          self.urls = response.data.urls;
        })
      }

      function clearHistory(urls) {
        console.log('clearing');
      }

      this.addUrl = addUrl;
      this.updateUrl = updateUrl;
      this.removeUrl = removeUrl;
      this.clearHistory = clearHistory;

    } //SiteController
})() //IIFE
