Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace 'api' do
    namespace 'v1' do
      resources :logins
    end
  end

  post 'auth/register', to: 'users#register'
  post 'auth/login', to: 'users#login'
  get 'test', to: 'users#test'

  get 'gethere', to: 'application#salvar_json'
  get 'gethere/cruzamentos', to: 'cruzamentos#index'

  get 'gethere/cruzamento/:idRua', to: 'cruzamentos#show'
end
