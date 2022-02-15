$(() => {
    // Declare socket io Object
    var socket = io();
    // Create Welcome Message in Chat Messages Section
    var messages = document.getElementById('divChatMessages');
    const div = document.createElement('div');
    const header = document.createElement('h6');
    header.innerText = 'Anonymous: ';
    header.innerHTML += `<span>${moment(Date.now()).format('LT')}</span>`;
    header.style.color = '#0062cc';
    div.appendChild(header);
    const para = document.createElement('p');
    para.innerText = 'Hello How Can I Help You!?';
    div.appendChild(para);
    div.classList.add('chat-container');
    messages.appendChild(div);

    // Handle Send Button Click Event
    $('#btnSend').click(function(e) { 
        e.preventDefault();
        var chatmsg = {  
            username: $('#txtUsername').val(),  
            message: $('#txtMessage').val(),
            createdDate: Date.now()
        }
        if (chatmsg.username && chatmsg.message && chatmsg.createdDate) {
            postChat(chatmsg);
            socket.emit('chat message', chatmsg);
        }
        $('#txtMessage').val('');
    });

    socket.on('chat message', function(chatmsg) {
        const div = document.createElement('div');
        const header = document.createElement('h6');
        header.innerText = chatmsg.username;
        header.innerHTML += `<span>: ${moment(chatmsg.createdDate).format('LT')}</span>`;
        div.appendChild(header);
        const para = document.createElement('p');
        para.innerText = chatmsg.message;
        div.appendChild(para);
        div.classList.add('chat-container');
        messages.appendChild(div);
    });

    // Handle View Chat Log Button Click Event
    $('#btnViewLog').click(function(e) { 
        e.preventDefault();
        getChats();
    });
});


function postChat(chat) {  
    $.post('/', chat);  
};

function getChats() {
    var username = $('#txtUsername').val();
    if (username) 
    {
        var log = document.getElementById('divChatLog');
        log.innerHTML = '';
        $.get(`/${username}`, (chats) => {
            chats.forEach(addChatLog);
        });
    }   
};

function addChatLog(chatmsg) {
    var log = document.getElementById('divChatLog');
    const div = document.createElement('div');
    const header = document.createElement('h6');
    header.innerText = chatmsg.username;
    header.innerHTML += `<span>: ${moment(chatmsg.createdDate).format('DD-MM-YYYY HH:mm:ss')}</span>`;
    div.appendChild(header);
    const para = document.createElement('p');
    para.innerText = chatmsg.message;
    div.appendChild(para);
    div.classList.add('chat-container');
    log.appendChild(div);
};