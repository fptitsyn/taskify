import smtplib
from email.mime.text import MIMEText
from email_config import password, sender


def send_email(recipient):
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender, password)
    with open("index.html") as file:
        template = file.read()
    # print(template)
    message = MIMEText(template,"html")
    message['Subject'] = "У вас появилось новое задание!"
    message['From'] = sender
    message['To'] = recipient
    # server.set_debuglevel(1) #потом удалить
    try:
        server.sendmail(message['From'], recipient, message.as_string())
    except smtplib.SMTPRecipientsRefused:
        pass
    server.quit()


# send_email(recipient="artemsnoyson@gmail.com")
