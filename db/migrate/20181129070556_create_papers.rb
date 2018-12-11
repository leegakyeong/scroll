class CreatePapers < ActiveRecord::Migration[5.1]
  def change
    create_table :papers do |t|
      t.integer :user_id, foreign_key: true
      t.string :color
      t.string :background_color

      t.timestamps
    end
  end
end
