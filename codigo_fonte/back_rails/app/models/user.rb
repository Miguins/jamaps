class User < ApplicationRecord
    #Validations
    validates_presence_of :username, :password_digest
    validates :username, uniqueness: true
  
    #encrypt password
    has_secure_password
 end