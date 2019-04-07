
class CruzamentosController < ApplicationController
    # * =========================
    # * LISTAR CRUZAMENTOS
    # * =========================
    def  index
         @cruzamentos = Cruzamento.order(created_at: :asc)
         render json: {status: 'SUCCESS', message: 'Lista de Cruzamentos carregada', data: @cruzamentos}, status: :ok
    end
    
end