class CreateRuaTransversals < ActiveRecord::Migration[5.1]
  def change
    create_table :rua_transversals do |t|
      t.string :nomeRuaTransversal
      t.string :idRuaTransversal
      t.string :pontosDeEncontro, array: true, default: []
      t.integer :velocidadeDeFluxoAtual
      t.integer :velocidadeEmFluxoLivre
      t.integer :nivelDeTrafego
      t.references :cruzamento, index: true

      t.timestamps
    end
  end
end
