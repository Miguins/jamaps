# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190330213447) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

# Could not dump table "cruzamentos" because of following StandardError
#   Unknown type 'time with time zone' for column 'tempoDaPrevisao'

  create_table "logins", force: :cascade do |t|
    t.string "username"
    t.string "senha"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ruasTransversais", id: false, force: :cascade do |t|
    t.string "fluxoAtual", null: false, array: true
    t.string "nomeRuaTransversal", limit: 255
    t.string "pontosDeEncontro", array: true
    t.integer "idCruzamento"
    t.index ["idCruzamento"], name: "fki_idCruzamento"
  end

  create_table "usuarios", id: :integer, default: nil, force: :cascade do |t|
    t.string "user", limit: 10
    t.string "senha", limit: 30
  end

  add_foreign_key "ruasTransversais", "cruzamentos", column: "idCruzamento", name: "idCruzamento"
end
