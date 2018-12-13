class ApplicationController < ActionController::API
  include Knock::Authenticable
  # protect_from_forgery unless: -> { request.format.json? } # https://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection.html#method-i-form_authenticity_token
end
