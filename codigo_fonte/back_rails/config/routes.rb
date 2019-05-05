Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace 'api' do
    namespace 'v1' do
      resources :logins
    end
  end

  # * =========================
  # * ROTAS DE CADASTRO
  # * =========================
  post 'auth/register', to: 'users#register'
  post 'auth/login', to: 'users#login'
  get 'test', to: 'users#test'


  # * =========================
  # * ROTAS DE CRUZAMENTO
  # * =========================
  get 'gethere', to: 'application#salvar_json'
  get 'gethere/cruzamentos', to: 'cruzamentos#index'

  get 'gethere/cruzamento/:idRua', to: 'cruzamentos#show'


  # * =========================
  # * ROTAS DE TOTEMS
  # * =========================
  post 'totem/register', to: 'totems#create'
  put 'totem/:id', to: 'totems#update'
  delete "totem/delete/:id", to: "totems#destroy"
  get 'totems', to: 'totems#index'
  get 'totem/:id', to: 'totems#show'
end
