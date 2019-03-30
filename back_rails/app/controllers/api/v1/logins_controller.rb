module Api
    module V1
        class LoginsController < ApplicationController

            # * =========================
            # * LISTAR
            # * =========================

            def  index
                @logins = Login.order(created_at: :asc)
                render json: {status: 'SUCCESS', message: 'Carregado com sucesso', data: @logins}, status: :ok
            end

            # * =========================
            # * EXIBIR
            # * =========================
            
            def show
                login = Login.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Find por id sucesso', data: login}, status: :ok
            end

            # * =========================
            # * CRIAR
            # * =========================

            def create
                login = Login.new(login_params)
                if login.save
                    render json: {status: 'SUCCESS', message: 'Criado com sucesso', data: login}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'Não foi possível criar', data: login.errors}, status: :unprocessable_entity
                end
                
            end

            # * =========================
            # * ATUALIZAR
            # * =========================

            def update
                login = Login.find(params[:id])
                if login.update().update_attributes(login_params)
                    render json: {status: 'SUCCESS', message: 'Atualizado com sucesso', data: login}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'Não foi possível atualizar', data: login.errors}, status: :unprocessable_entity
                end
            end

            private
            def login_params
                params.permit(:username, :senha)
            end
        end
    end 
end