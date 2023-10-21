import telebot
import configurations
import sqlite3
from bot_db import init
bot = telebot.TeleBot(configurations.TOKEN[0])

email_example = 'artemsnoyson@gmail.com'

@bot.message_handler(commands=['start'])
def welcome_message(message):
    bot.send_message(message.chat.id, "Тут информация о боте")


@bot.message_handler(commands=['reg'])
def reg_message(message):
    bot.send_message(message.chat.id, "Введите ваши данные(ФИО, e-mail, token) в формате следующем формате:")
    msg = bot.send_message(message.chat.id, "Иванов Иван Иваныч \n"
                                            "example@mail.ru")
    bot.register_next_step_handler(msg, send_inf_user)


# -------------------------------------------------------------------------------
def execute_all_datatable():
    conn = sqlite3.connect("mydatabase.db")
    cursor = conn.cursor()
    cursor.execute('DELETE FROM users;', );
    conn.commit()
    cursor.close()
    init()
# --------------------------------------------------------------------------------


def send_inf_user(message):
    user_id = message.from_user.id
    user_informations = {"Name": "", "E-mail": "", "Telegram": ""}
    send_informations = message.text
    send_informations = send_informations.split()
    user_informations["Name"] = send_informations[0] + send_informations[1] + send_informations[2]
    user_informations["E-mail"] = send_informations[3]
    user_informations["Telegram"] = user_id
    name = send_informations[0] + send_informations[1] + send_informations[2]
    email = send_informations[3]
    bot.send_message(message.chat.id, "Well done! Вы успешно зарегистрировались!")
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    conn.execute("INSERT INTO users (name, email, telegram) VALUES (?, ?, ?)",
                 (name, email, user_id))
    conn.commit()
    users = conn.execute("SELECT * FROM users").fetchall()
    users_list = list()
    for i in range(len(users)):
        users_dict = dict()
        users_dict["name"] = users[i]["name"]
        users_dict["email"] = users[i]["email"]
        users_dict["telegram"] = users[i]["telegram"]
        users_list.append(users_dict)
    for i in users_list:
        print(i)
    print()
    conn.close()
    return users_list
# --------------------------------------------------------------------------------
def search_tg(recipient):
    conn = sqlite3.connect("database.db")
    users = conn.execute("SELECT * FROM users").fetchall()
    for i in users:
        if i[3] == recipient:
            user_id = i[4]
            return user_id
    user_id = 0
    return user_id


def send_tg_notification(receiver):
    user_id = search_tg(recipient=receiver)
    if user_id != 0:
        bot.send_message(chat_id=user_id, text='Срочно!\nВам пришло новое задание.\nСкорее заходи на Taskify и выполняй')
# send_tg_notification()
bot.polling(none_stop=True)