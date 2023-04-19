from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_chatgpt(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": str(prompt) }]
            )
    message = completion.choices[0].message['content']
    print(message)
    return message

@app.route('/api/chat', methods=['POST'])
def chat():
    message_data = request.get_json()
    received_message = message_data.get('message', 'No message received')
    chatgpt_response = chat_with_chatgpt(received_message)
    return jsonify({"response": chatgpt_response})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)

