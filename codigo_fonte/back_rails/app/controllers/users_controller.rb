class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: %i[login register]

    def login
        authenticate params[:username], params[:password]
      end
      def test
        render json: {
              message: 'You have passed authentication and authorization test'
            }
      end

    # POST /register
     def register
       @user = User.create(user_params)
      if @user.save
       response = { message: 'User created successfully'}
       render json: response, status: :created 
      else
       render json: @user.errors, status: :bad
      end 
     end
   
     private
   
     def user_params
       params.permit(
         :username,
         :password
       )
     end

        #Private
        def authenticate(username, password)
            command = AuthenticateUser.call(username, password)

            if command.success?
            render json: {
                access_token: command.result,
                message: 'Login Successful'
            }
            else
            render json: { error: command.errors }, status: :unauthorized
            end
        end
   end