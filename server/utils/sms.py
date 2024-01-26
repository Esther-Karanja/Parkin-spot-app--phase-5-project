# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client





class SMS:
    def __init__(self):
        self.account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.verify_sid = os.getenv("TWILIO_VERIFY_SID")
        self.verified_number = os.getenv("TWILIO_VERIFIED_NUMBER")

    def send_sms(self, receiver_number, message):
        print(self.account_sid, self.auth_token)
        client = Client(self.account_sid, self.auth_token)

        client.messages.create(
            body=message,
            from_=self.verified_number,
            to=receiver_number
        )

        print("SMS sent successfully.")
        return

        