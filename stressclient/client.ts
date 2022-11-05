import { HathoraClient } from "@hathora/client-sdk";

// sha256 hash of app secret
const APP_ID = "app-fc74dc5c-2307-4548-a952-e23046e7202c";
// create client
const client = new HathoraClient(APP_ID);
const encoder = new TextEncoder();

while (true) {
    const token = await client.loginAnonymous();
    // create new room
    const roomId = await client.create(token, new Uint8Array());
    console.log("new room: " + roomId);
    const connection = await client.connect(token, roomId, onMessage, onError);
    setInterval(function () {
        connection.write(encoder.encode("{\"type\": 2}"));
    }, 1000);
    await new Promise(r => setTimeout(r, 2000));
}

// process message from backend
function onMessage(msg : any) {
  // console.log(msg);
}

// process error from backend
function onError(error : any) {
  console.error(error);
}