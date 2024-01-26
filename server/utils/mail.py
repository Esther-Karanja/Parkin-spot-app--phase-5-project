import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class Mail:
    def __init__(self):
        self.sender_email = "wakioperis7@gmail.com"
        self.sender_password = "P@125sirep"

    def send_email(self, receiver_email, subject, body):


        # SMTP server configuration for Gmail
        smtp_server = "smtp.gmail.com"
        smtp_port = 587

        # Create the email message
        message = MIMEMultipart()
        message["From"] = self.sender_email
        message["To"] = receiver_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))

        # Connect to the SMTP server
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            # Start the TLS connection (for secure connection)
            server.starttls()

            # Log in to the email account
            server.login(self.sender_email, self.sender_password)

            # Send the email
            server.sendmail(self.sender_email, receiver_email, message.as_string())

        print("Email sent successfully.")