# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: "유저1", email: "a@a.com", password: "aaaaaa", password_confirmation: "aaaaaa", admin: true) # 왜 전에 confirm이라고만 했을 때는 에러가 안 떴을까...
User.create(name: "유저2", email: "b@b.com", password: "bbbbbb", password_confirmation: "bbbbbb")
User.create(name: "유저3", email: "c@c.com", password: "cccccc", password_confirmation: "cccccc")
User.create(name: "유저4", email: "d@d.com", password: "dddddd", password_confirmation: "dddddd")
User.create(name: "유저5", email: "e@e.com", password: "eeeeee", password_confirmation: "eeeeee")

Paper.create(color: "mediumpurple", background_color: "lavenderblush", user_id: 1)
Paper.create(color: "mediumslateblue", background_color: "ghostwhite", user_id: 2)
Paper.create(color: "cornflowerblue", background_color: "whitesmoke", user_id: 3)
Paper.create(color: "fuchsia", background_color: "greenyellow", user_id: 4)
Paper.create(color: "blue", background_color: "lavender", user_id: 5)

Memo.create(content: "hello1", from: "b@b.com", paper_id: 1, user_id: 2)
Memo.create(content: "hello2", from: "c@c.com", paper_id: 2, user_id: 3)
Memo.create(content: "hello3", from: "d@d.com", paper_id: 3, user_id: 4)
Memo.create(content: "hello4", from: "e@e.com", paper_id: 1, user_id: 5)
Memo.create(content: "hello5", from: "a@a.com", paper_id: 4, user_id: 1)
Memo.create(content: "hello6", from: "b@b.com", paper_id: 5, user_id: 2)
Memo.create(content: "hello7", from: "c@c.com", paper_id: 4, user_id: 3)
