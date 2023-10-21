TOKEN = ["5339894944:AAHW0Wp_mt7XfNV0hqSEX0Ze22Z3xPUIIas"]

'''import telebot
import configurations
import registrations_tg

#--------------------------------------------------------------------------------
import sqlite3
conn = sqlite3.connect("mydatabase.db")
cursor = conn.cursor()
cursor.execute("""CREATE TABLE user
                (name,age)
                   """)
conn.commit()
#--------------------------------------------------------------------------------

bot = telebot.TeleBot(configurations.TOKEN[0])
@bot.message_handler(commands=['start'])
def welcome_message(message):
    bot.send_message(message.chat.id, "Тут информация о боте")

@bot.message_handler(commands=['reg'])
def reg_message(message):
    bot.send_message(message.chat.id, "Введите ваши данные(ФИО, e-mail, token) в формате следующем формате:")
    msg = bot.send_message(message.chat.id, "Иванов Иван Иваныч \n"
                                      "example@mail.ru")
    bot.register_next_step_handler(msg, send_inf_user)

user_informations = {"Name": "", "E-mail": ""}



def send_inf_user(message):
  send_informations = message.text
  send_informations = send_informations.split()
  user_informations["Name"] = send_informations[0] + send_informations[1] + send_informations[2]
  user_informations["E-mail"] = send_informations[3]

  bot.send_message(message.chat.id, "Well done! Вы успешно зарегистрировались!")
  reload_informations()
  hide_inf()

#--------------------------------------------------------------------------------

def reload_informations():
    cursor.execute(user_informations)
    conn.commit()
def hide_inf():
    for value in cursor.execute("SELECT * FROM albums"):
        print(value)

@bot.message_handler(commands=['req'])
def send_request(message):
  bot.send_message(message.chat.id, "Введите данные заявки(токен, e-mail) в формате следующем формате:")
  msg = bot.send_message(message.chat.id, "token")
  bot.register_next_step_handler(msg, search_board)

bot.polling(none_stop=True)
'''