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
    parsed_json = ActiveSupport::JSON.decode(request.body.read)

    for rua in parsed_json["dados"]["ruas"]["cruzamentos"]
      site = Cruzamento::new()
      site.nomeRuaPrincipal = rua["nomeRuaPrincipal"]
      site.idRua = rua["id"]
      site.tempoDaPrevisao = rua["tempoDaPrevisao"]
      
      site.save

      for transversal in rua["ruasTransversais"]
        t = RuaTransversal::new()
        t.nomeRuaTransversal = transversal["nomeRuaTransversal"]
        t.pontosDeEncontro = transversal["pontosDeEncontro"]
        t.velocidadeDeFluxoAtual = transversal["fluxoAtual"][0]["velocidadeDeFluxoAtual"]
        t.velocidadeEmFluxoLivre = transversal["fluxoAtual"][0]["velocidadeEmFluxoLivre"]
        t.nivelDeTrafego = transversal["fluxoAtual"][0]["nivelDeTrafego"]
        t.cruzamento_id = site.id
        
        t.save
      end
    end
  end
end
