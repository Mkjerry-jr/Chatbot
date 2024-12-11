// Dark mode toggle function
document.getElementById('themeToggle').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode'); // Toggle dark mode class
    body.classList.toggle('light-mode'); // Toggle light mode class

    // Change the button text or icon
    const isDarkMode = body.classList.contains('dark-mode');
    document.getElementById('themeToggle').textContent = isDarkMode ? '🌙' : '🌞'; // Toggle moon/sun icon
});

// Add an event listener to the input field for the Enter key
document.getElementById('userInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default action of the Enter key
        sendMessage(); // Call the sendMessage function
    }
});

// Clear chatbox initially
const chatbox = document.getElementById('chatbox');
chatbox.innerHTML = ''; // Ensure the chatbox is empty when the page loads

// Placeholder message initially in chatbox
const placeholderMsg = document.createElement('div');
placeholderMsg.className = 'message placeholder';
placeholderMsg.innerHTML = `
    <div class="text">Type something to start chatting...</div>
`;
chatbox.appendChild(placeholderMsg);

// Scroll to bottom to show the placeholder message
chatbox.scrollTop = chatbox.scrollHeight;

async function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;

    // Remove the placeholder message once the first message is sent
    const placeholder = chatbox.querySelector('.message.placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    // Display user message with profile
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `
        <div class="text">${userInput}</div>
        <div class="profile"></div>
    `;
    chatbox.appendChild(userMsg);

    // Simulate bot typing animation
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.innerHTML = `
        <div class="profile"></div>
        <div class="text typing">...</div>
    `;
    chatbox.appendChild(botMsg);

    // Scroll to bottom to show the new messages
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();

        // Update bot response
        setTimeout(() => {
            botMsg.querySelector('.text').textContent = data.response;
        }, 500);
    } catch (error) {
        setTimeout(() => {
            botMsg.querySelector('.text').textContent = 'Oops! Something went wrong.';
        }, 500);
    }

    // Clear input field
    document.getElementById('userInput').value = '';
}
