class CreateCruzamentos < ActiveRecord::Migration[5.1]
  def change
    create_table :cruzamentos, id: false do |t|
      t.string :nomeRuaPrincipal
      t.string :idRua, null: false
      t.string :tempoDaPrevisao

      t.timestamps
    end
    execute %Q{ ALTER TABLE "cruzamentos" ADD PRIMARY KEY ("idRua"); }
  end
end
