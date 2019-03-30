class Login < ApplicationRecord
    validates :username, presence: true
    validates :senha, presence: true
end
