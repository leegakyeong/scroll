class Paper < ApplicationRecord
    has_many :memos
    belongs_to :user
end
