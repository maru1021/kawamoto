class CreateNotis < ActiveRecord::Migration[7.1]
  def change
    create_table :notis do |t|
      t.string :title
      t.text :article

      t.timestamps
    end
  end
end
