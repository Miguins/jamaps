
namespace :jamaps do
    desc "This task is called by the Heroku scheduler add-on"
        task :update_ruas => :environment do
            require 'rest-client'
            require 'json'
            salvar = ActionController::Base::ApplicationController.new

        puts "Salvando dados da API HERE..."
        salvar.salvar_json
        puts "Dados salvos com sucesso!"
        end
end