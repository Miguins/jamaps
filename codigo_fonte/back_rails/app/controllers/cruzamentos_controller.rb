
class CruzamentosController < ApplicationController
    # * =========================
    # * LISTAR CRUZAMENTOS
    # * =========================
    def  index
         @cruzamentos = Cruzamento.order(created_at: :asc)
         render json: {status: 'SUCCESS', message: 'Lista de Cruzamentos carregada', data: @cruzamentos}, status: :ok
    end

    # * =========================
    # * FIND CRUZAMENTOS E SUAS RUAS TRANSVERSAIS
    # * =========================
    def show
        @cruzamento = Cruzamento.find_by_idRua(params[:idRua])
        # exemplo: idRua = B15-12812
        # partes = params[:idRua].split(/[+\-]/, 2) #=> ["B15", "12812"]
        # padrao_busca = "????" + partes[1]
        # @ruas_transversais = RuaTransversal.where('idRua LIKE ?', padrao_busca)
        # ["user_name = :u", { u: user_name }]
        @idRua = params[:idRua]
        @rua_transversais = RuaTransversal.where(:cruzamentoId => @idRua).order(created_at: :asc)
    
        render json: {status: 'SUCCESS', message: 'Cruzamento carregado', data: {"cruzamentos": @cruzamento, "rua_transversais": @rua_transversais}}, status: :ok
    end
end