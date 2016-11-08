(function() {
  angular
    .module('Site')
    .controller('SiteController', SiteController)

    function SiteController($scope) {
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

      // this.showUrls = function() {
      // }

      function addUrl(newUrl) {
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
        $http.delete(`/urls/${id}`)
        .then(function(response) {
          console.log(response);
          self.urls = response.data.urls;
        })
      }

      this.addUrl = addUrl;
      this.updateUrl = updateUrl;
      this.removeUrl = removeUrl;

    } //SiteController
})() //IIFE
