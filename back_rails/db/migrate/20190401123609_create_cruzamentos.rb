class CreateCruzamentos < ActiveRecord::Migration[5.1]
  def change
    create_table :cruzamentos do |t|
      t.string :nomeRuaPrincipal
      t.string :idRua
      t.string :tempoDaPrevisao

      t.timestamps
    end
  end
end
