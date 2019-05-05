
class TotemsController < ApplicationController
    # * =========================
    # * LISTAR TOTEMS
    # * =========================
    def  index
         @totems = Totem.order(created_at: :asc)
         render json: {status: 'SUCCESS', message: 'Lista de Totems carregada', data: @totems}, status: :ok
    end

    # * =========================
    # * MOSTAR TOTEM INDIVIDUAL
    # * =========================
    def show
        @totem = Totem.find(params[:id])
        render json: {status: 'SUCCESS', message: 'Totem carregado', data: @totem}, status: :ok
    end

    # * =========================
    # * CRIAR TOTEMS
    # * =========================
    def create
        totem = Totem.new(totem_params)

        if totem.save
            render json: {status: 'SUCCESS', message: 'Criado com sucesso', data: totem}, status: :ok
        else
            render json: {status: 'ERROR', message: 'Não foi possível criar', data: totem.errors}, status: :unprocessable_entity
        end
    end

    # * =========================
    # * DELETAR TOTEMS
    # * =========================
    def destroy
        @totem = Totem.find(params[:id])
        @totem.destroy

        render json: {status: 'SUCCESS', message: 'Deletado com sucesso', data: @totem}, status: :ok
    end

    # * =========================
    # * ATUALIZAR TOTEMS
    # * =========================
    def update
        totem = Totem.find(params[:id])

        if totem.update_attributes(totem_params)
            render json: {status: 'SUCCESS', message: 'Atualizado com sucesso', data: totem}, status: :ok
        else
            render json: {status: 'ERROR', message: 'Não foi possível atualizar', data: totem.errors}, status: :unprocessable_entity
        end
    end

    def totem_params
        params.permit(:nome, :ruaPrincipal, :ruaTransversal, :latitude, :longitude)
    end
end