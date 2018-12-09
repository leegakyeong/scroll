# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Paper.create(color: "mediumpurple", background_color: "lavenderblush")
Paper.create(color: "mediumslateblue", background_color: "ghostwhite")
Paper.create(color: "cornflowerblue", background_color: "whitesmoke")

Memo.create(content: "hello1", from: "noone1", paper_id: 1)
Memo.create(content: "hello2", from: "noone2", paper_id: 2)
Memo.create(content: "hello3", from: "noone3", paper_id: 3)
Memo.create(content: "hello4", from: "noone4", paper_id: 1)