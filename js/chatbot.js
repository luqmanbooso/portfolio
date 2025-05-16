document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Predefined responses
    const responses = {
        'hi': 'Hello! How can I help you today?',
        'hello': 'Hi there! How can I assist you?',
        'help': 'I can provide information about Luqman\'s skills, projects, or contact details. What would you like to know?',
        'contact': 'You can reach Luqman at luqmanbooso@gmail.com or use the contact form on this page.',
        'resume': 'You can download Luqman\'s resume using the "Download Resume" button in the About section.',
        'projects': 'Luqman has worked on several projects including Boutique - a hotel booking platform. Check out the Projects section for more details.',
        'skills': 'Luqman is proficient in various technologies including Java, JavaScript, Python, HTML/CSS, React, and more. See the Skills section for a complete list.',
        'experience': 'Luqman is an IT undergraduate at SLIIT with experience in full-stack development, UI/UX design, and more.',
        'location': 'Luqman is based in Colombo, Sri Lanka.',
        'default': 'I don\'t have information about that yet. For specific inquiries, please use the contact form or email directly to luqmanbooso@gmail.com.'
    };

    // Toggle chat container
    chatButton.addEventListener('click', function() {
        chatContainer.classList.toggle('hidden');
        chatButton.classList.toggle('animate-pulse-glow');
    });

    // Close chat
    closeChat.addEventListener('click', function() {
        chatContainer.classList.add('hidden');
        chatButton.classList.add('animate-pulse-glow');
    });

    // Send message function
    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        const userMessageEl = document.createElement('div');
        userMessageEl.className = 'flex items-start justify-end';
        userMessageEl.innerHTML = `
            <div class="bg-primary-dark text-white rounded-lg p-3 max-w-[80%]">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(userMessageEl);

        // Clear input
        chatInput.value = '';

        // Auto scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'flex items-start';
        typingIndicator.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center mr-2 flex-shrink-0">
                <span class="text-white text-sm font-bold">LB</span>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <p class="text-gray-800 dark:text-gray-200">typing<span class="typing-dots">...</span></p>
            </div>
        `;
        typingIndicator.id = 'typing-indicator';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Get response after a short delay
        setTimeout(() => {
            // Remove typing indicator
            const indicator = document.getElementById('typing-indicator');
            if (indicator) chatMessages.removeChild(indicator);

            // Generate response
            let responseText = getResponse(message.toLowerCase());

            // Add bot response
            const botResponseEl = document.createElement('div');
            botResponseEl.className = 'flex items-start';
            botResponseEl.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center mr-2 flex-shrink-0">
                    <span class="text-white text-sm font-bold">LB</span>
                </div>
                <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <p class="text-gray-800 dark:text-gray-200">${responseText}</p>
                </div>
            `;
            chatMessages.appendChild(botResponseEl);

            // Auto scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    // Get response based on input
    function getResponse(input) {
        // Check for key phrases in the input
        for (const [key, value] of Object.entries(responses)) {
            if (input.includes(key)) {
                return value;
            }
        }
        return responses.default;
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendUserMessage);

    // Send message on enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
});
