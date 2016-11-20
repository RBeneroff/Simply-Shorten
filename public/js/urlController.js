(function() {
  angular
    .module('Site')
    .controller('SiteController', SiteController)

    function SiteController($scope, $http, $state) {
      var self = this;

      function getUrls() {
        $http.get('/urls')
        .then(function(response) {
          self.urls = response.data.urls;
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
          url: `https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDyo_ZNPgLhmKEHYT7elKV7_58-yBFlvlk`,
          method: 'POST',
          data: {longUrl : longUrl, origin : origin, newUrl : newUrl}
        })
        .then(function(response) {
          newUrl = response.data.id;
          urlObj = {
            longUrl: longUrl,
            newUrl: newUrl,
            origin: origin
          }
          $http.post('/urls', urlObj)
          .then(function(response) {
              longUrl.input = '';
              origin.input = '';
              self.urls.push(urlObj);
              console.log(urlObj, 'after saving');
              console.log(urlObj.newUrl);
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

      function removeUrl(url, index) {
        console.log('clicked')
        $http.delete(`/urls/${url._id}`, url)
        .then(function(response) {
          console.log(response);
          self.url = response.data.url;
          self.urls.splice(index, 1);
        })
      }

      function clearHistory(urls) {
        console.log('clearing');
        $http.delete('/urls', urls)
        .then(function(response) {
          self.urls = [];
        })
      }

      this.updateUrl = updateUrl;
      this.removeUrl = removeUrl;
      this.clearHistory = clearHistory;

    } //SiteController
})() //IIFE
