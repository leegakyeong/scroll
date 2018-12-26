class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email # https://codycallahan.com/blog/authenticate-rails-api-with-knock-jwt
      t.string :password_digest
      t.boolean :admin, defalut: false

      t.timestamps
    end
  end
end
