class CreateSupporters < ActiveRecord::Migration[7.1]
  def change
    create_table :supporters do |t|
      t.text :name, null: false
      t.text :post, null: false
      t.text :address, null: false
      t.text :phone, null: false
      t.date :birth, null: false
      t.timestamps
    end
  end
end
