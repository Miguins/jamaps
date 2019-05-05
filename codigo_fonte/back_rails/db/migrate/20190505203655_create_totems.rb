class CreateTotems < ActiveRecord::Migration[5.1]
  def change
    create_table :totems do |t|
      t.string :nome
      t.string :ruaPrincipal
      t.string :ruaTransversal
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
