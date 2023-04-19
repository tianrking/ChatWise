document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const chatHistory = document.querySelector('.chat-history');

  sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
      addMessageToChatHistory('User', message);
      userInput.value = '';
      getChatbotResponse(message);
    }
  });

  userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendButton.click();
    }
  });

  function addMessageToChatHistory(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender.toLowerCase());
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  async function getChatbotResponse(message) {
    try {
      const response = await fetch('http://your_server:port/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          message: message
        })
      });

      if (response.ok) {
        const data = await response.json();
        addMessageToChatHistory('Chatbot', data.response);
      } else {
        console.error('Error fetching chatbot response:', response.status);
        addMessageToChatHistory('Chatbot', 'Sorry, I could not understand your request.');
      }
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      addMessageToChatHistory('Chatbot', 'Sorry, I am unable to process your request at the moment.');
    }
  }
});

