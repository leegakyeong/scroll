class CreateMemos < ActiveRecord::Migration[5.1]
  def change
    create_table :memos do |t|
      t.integer :paper_id, foreign_key: true
      t.text :content
      t.string :from

      t.timestamps
    end
  end
end
