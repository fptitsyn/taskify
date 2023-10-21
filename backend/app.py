import sqlite3

from flask import Flask, abort, request, jsonify, make_response
from flask_cors import CORS

from email_sender import send_email


# Connect to database
def get_db_connection():
    connection = sqlite3.connect("database.db")
    connection.row_factory = sqlite3.Row
    return connection


def get_id_from_title(title):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE title = ?",
                        (title,)).fetchone()
    conn.close()
    if task is None:
        abort(404)
    return task["id"]


def get_all_tasks():
    conn = get_db_connection()
    tasks = conn.execute("SELECT * FROM tasks").fetchall()
    conn.close()

    ret_tasks = []
    for i in range(len(tasks)):
        task_dict = dict()
        task_dict["id"] = tasks[i]["id"]
        task_dict["title"] = tasks[i]["title"]
        task_dict["content"] = tasks[i]["content"]
        task_dict["priority"] = tasks[i]["priority"]
        task_dict["status"] = tasks[i]["status"]
        task_dict["creator"] = tasks[i]["creator"]
        task_dict["receiver"] = tasks[i]["receiver"]
        ret_tasks.append(task_dict)

    return ret_tasks


app = Flask(__name__, static_folder='./static', static_url_path='/')
CORS(app)
app.config["SECRET_KEY"] = "b'd6{d7B\td0Df686|d7c703f5%e9'"


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "Not found"}), 404)


# Open and look through task
@app.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?",
                        [task_id]).fetchone()
    conn.close()
    if task is None:
        abort(404)

    task_dict = dict()
    task_dict["id"] = task["id"]
    task_dict["title"] = task["title"]
    task_dict["content"] = task["content"]
    task_dict["priority"] = task["priority"]
    task_dict["status"] = task["status"]
    task_dict["creator"] = task["creator"]
    task_dict["receiver"] = task["receiver"]
    return jsonify({"task": task_dict})


@app.route('/tasks', methods=["GET"])
def get_tasks():
    return jsonify({"tasks": get_all_tasks()})


# Create a new task
@app.route("/tasks/create", methods=["POST"])
def create_task():
    if not request.json or "title" not in request.json["task"]:
        abort(400)
    title = request.json["task"]["title"]
    content = request.json["task"].get("content", "")
    priority = request.json["task"]["priority"]
    status = request.json["task"]["status"]
    creator = request.json["task"]["creator"]
    receiver = request.json["task"]["receiver"]

    conn = get_db_connection()
    conn.execute("INSERT INTO tasks (title, content, priority, status, creator, receiver) VALUES (?, ?, ?, ?, ?, ?)",
                 (title, content, priority, status, creator, receiver))
    conn.commit()
    conn.close()

    resp = make_response(get_task(get_id_from_title(title)), 201)
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.headers.add("Access-Control-Allow-Credentials", True)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Credentials"] = True

    send_email(receiver)

    return resp


@app.route("/tasks/<int:task_id>/edit", methods=["PUT"])
def update_task(task_id):
    task = get_task(task_id)
    if not request.json or "title" not in request.json["task"]:
        abort(400)

    title = request.json["task"]["title"]
    content = request.json["task"].get("content", "")
    priority = request.json["task"]["priority"]
    status = request.json["task"]["status"]
    creator = request.json["task"]["creator"]
    receiver = request.json["task"]["receiver"]

    conn = get_db_connection()
    conn.execute("UPDATE tasks SET title=?, content=?, priority=?, status=?, creator=?, receiver = ? WHERE id=?",
                 (title, content, priority, status, creator, receiver, task_id))
    conn.commit()
    conn.close()

    return make_response(get_task(task_id), 201)


@app.route("/tasks/<int:task_id>/delete", methods=["DELETE"])
def delete_task(task_id):
    task = get_task(task_id)
    conn = get_db_connection()
    conn.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()
    return task


@app.route("/tasks/<int:task_id>/change-status", methods=["PUT"])
def change_task_status(task_id):
    task = get_task(task_id)
    task_status = request.json["task"]["status"]
    conn = get_db_connection()
    conn.execute("UPDATE tasks SET status=? WHERE id=?",
                 (task_status, task_id))
    conn.commit()
    conn.close()
    ret_task = get_task(task_id)

    return make_response(ret_task, 201)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
