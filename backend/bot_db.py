import sqlite3


def init():
    connection = sqlite3.connect("database.db")
    with open("bot_schema.sql") as f:
        connection.executescript(f.read())
    connection.commit()
    connection.close()
