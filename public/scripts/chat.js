let socket = io()
let userName;

Swal.fire({
    title: "Write your name :)",
    input: "text",
    inputValidator: (value) => !value && "please write your name",
    allowOutsideClick: false,
    }).then((res) => {
    userName = res.value;
    document.getElementById("username").innerHTML = userName;
    socket.emit("auth", userName);
    });


// socket.emit(
//     "first_connection",             //identificador del mensaje
//     {                              //
//         name: "flor",
//         age: 34
//     }
// )


let chatBox = document.getElementById("chatBox");
chatBox.addEventListener("keyup", send);

function send(e) {
if (e.key === "Enter") {
socket.emit("new_message", {
userName,
message: chatBox.value
})
} }

socket.on("allMessages", (data) => {
    document.getElementById ("messages").innerHTML = data.map(message => `<br><b>${message.userName}</b>: ${message.message}`).join('')
    }) //mapeo para transformar el array en string