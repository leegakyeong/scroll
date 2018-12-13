module Api
  class UserTokenController < ::Knock::AuthTokenController # https://stackoverflow.com/questions/44082142/routingerror-error-about-knock
    # protect_from_forgery unless: -> { request.format.json? }
    # skip_before_action :verify_authenticity_token
    # 이거 두 줄 추가해도 안됨.. https://github.com/nsarno/knock/issues/208
  end
end
