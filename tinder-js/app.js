var tinder = require('tinderjs');
var client = new tinder.TinderClient();

var FB_ID ="your-fb-id";
var FB_TOKEN ="your-fb-token";

client.authorize(
  FB_TOKEN,
  FB_ID,
  function() {
    var likeAllUsers = function(users) {
      if (users.length > 0) {
        // Like them all...
        users.forEach(function(user, index) {
          var id = user['_id'];
          var name = user['name'];

          client.like(id, function(err, data) {
            console.log("Liked " + name + "! (id: " + id + ")");
          });
        });

        searchForNearbyUsers();
      } else {
        console.log('You have liked all nearby users already!');
      }
    }

    var searchForNearbyUsers = function() {
      // Get recommended people nearby
      client.getRecommendations(10, function(error, data) {
        if (data && data.results) {
          likeAllUsers(data.results);
        } else {
          console.log("Uh oh, we might be throttled, let's wait 5 seconds..");
          setTimeout(searchForNearbyUsers, 5000);
        }
      });
    }

    searchForNearbyUsers();
  })
