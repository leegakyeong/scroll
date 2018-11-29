class CreatePapers < ActiveRecord::Migration[5.1]
  def change
    create_table :papers do |t|
      t.string :color
      t.string :background_color

      t.timestamps
    end
  end
end
