class CreateMemos < ActiveRecord::Migration[5.1]
  def change
    create_table :memos do |t|
      t.text :content
      t.string :from

      t.timestamps
    end
  end
end
