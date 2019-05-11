require 'rest-client'

class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user
  
  include ExceptionHandler

  private
  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end


  # =========================================
  # Salvar os dados da API do here no banco
  # =========================================

  public
  def salvar_json
      900.times do
        response = RestClient::Request.execute(method: :get, url: 'https://servicehere.herokuapp.com/?key=jamalgay24', timeout: 10)
        parsed_json = ActiveSupport::JSON.decode(response.body)

        for rua in parsed_json["dados"]["ruas"]["cruzamentos"]
          # site = Cruzamento::new()
          # site.nomeRuaPrincipal = rua["nomeRuaPrincipal"]
          # site.idRua = rua["id"]
          # site.tempoDaPrevisao = rua["tempoDaPrevisao"]
          
          site = Cruzamento.where({
            :idRua => rua["id"]
          }).first_or_create(nomeRuaPrincipal: rua["nomeRuaPrincipal"], tempoDaPrevisao: rua["tempoDaPrevisao"])

          for transversal in rua["ruasTransversais"]
            t = RuaTransversal::new()
            t.nomeRuaTransversal = transversal["nomeRuaTransversal"]
            t.pontosDeEncontro = transversal["pontosDeEncontro"]
            t.velocidadeDeFluxoAtual = transversal["fluxoAtual"][0]["velocidadeDeFluxoAtual"]
            t.velocidadeEmFluxoLivre = transversal["fluxoAtual"][0]["velocidadeEmFluxoLivre"]
            t.nivelDeTrafego = transversal["fluxoAtual"][0]["nivelDeTrafego"]
            t.cruzamentoId = site.idRua
            
            t.save
          end
        end
      sleep(1.hours)
    end # times fim
  end
end
