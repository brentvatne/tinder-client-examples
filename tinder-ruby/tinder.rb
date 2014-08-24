require 'bundler'
require 'pyro'

FACEBOOK_ID = '-your-fb-id-'
FACEBOOK_TOKEN = '-your-fb-token-'

tinder = TinderPyro::Client.new
tinder.sign_in(FACEBOOK_ID, FACEBOOK_TOKEN)

loop do
  response = tinder.get_nearby_users

  if response && response['results']
    users = response['results']

    exit if users.length == 0

    users.each do |user|
      tinder.like(user['_id'])
      puts "Liked " + user['name'] + "! (id: " + user['_id'] + ")"
    end
  end
end
