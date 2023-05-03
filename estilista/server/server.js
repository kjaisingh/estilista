/*
   OUTFITS SERVER
*/

const WebSocket = require('ws');
const { socketPort, casual_outfit, default_outfit } = require('../src/utils/utils');
const { broadcastJSON, broadcastActiveUsers, sendErrorToClient, getMidjourneyPrompt } = require('./serverUtils');
const discord_bot = require('./bot');


// ACTIVE OUTFITS
const channels = [
    { outfit_id: 'channel1', clients: new Set(), outfit_data: casual_outfit },  // Example channel
];

const socket_to_username_map = new Map();

async function runWebSocketServer() {
    const server = new WebSocket.Server({ port: socketPort });

    server.on('connection', (socket) => {
        console.log('WebSocket client connected');

        socket.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log("RECEIVED: ", data);
                // User JOINS A CHANNEL channel
                if (data.is_join) {
                    let channel = channels.find((r) => r.outfit_id === data.outfit_id);
                    if (channel) {
                        // Add sender to channel if not present
                        channel.clients.add(socket);
                    } else {
                        // Create new channel representation if channel id is not in server
                        channel = { outfit_id: data.outfit_id, clients: new Set([socket]) }
                        channels.push(channel);

                        console.log("Created outfit " + data.outfit_id + " channel in memory");
                    }
                    // Add user to socket to username map
                    socket_to_username_map.set(socket, data.username);
                    if (broadcastActiveUsers(channel, socket_to_username_map))
                        console.log("User " + data.username + " joined channel " + channel.outfit_id);
                    return;
                }

                // If message equals render
                if (data.is_render) {
                    const channel = channels.find((r) => r.outfit_id === data.outfit_id);
                    if (!channel)
                        return sendErrorToClient(socket, "ERROR: Channel " + data.outfit_id + " does not exist in memory");
                    // Get Midjourney Prompt
                    const prompt = getMidjourneyPrompt(data.prompt_context, channel);
                    // Check cache to see if image has already been rendered
                    if (channel.job_prompt && channel.job_prompt === prompt && channel.last_rendered_image) {
                        const render_img_message_JSON = { "outfit_id": channel.outfit_id, "render_img": value.url };
                        if (broadcastJSON(channel, null, render_img_message_JSON))
                            console.log(`Successfully updated ${channel.outfit_id}'s image with CACHED Midjourney Render`);
                        return;
                    }
                    // Add prompt to channel - Trim addition of /imagine
                    channel.job_prompt = prompt.substring(9);
                    const generalDiscordChannel = discord_bot.channels.cache.find(channel => channel.name === 'general');
                    generalDiscordChannel.send(prompt);
                    console.log(`Sent job for channel ${channel.outfit_id}: ${channel.job_prompt}`);
                    return;
                }

                // If message contains channel attribute
                if (data.selected_items) {

                    // Find room in channels
                    const channel = channels.find((r) => r.outfit_id === data.outfit_id);
                    if (channel) {
                        // Reconcile incoming message with state
                        if (!channel.outfit_data) channel.outfit_data = {};
                        channel["outfit_data"]["selected_items"] = data.selected_items;
                        // Send message to all clients in room
                        if (broadcastJSON(channel, socket, channel.outfit_data))
                            console.log("Broadcasted message: " + message);
                    } else {
                        // Send error message if channel is not in memory
                        sendErrorToClient(socket, sendErrorToClient);
                    }
                    return;
                }


                // Output error message
                console.error('Missing channel property in message');

            } catch (error) {
                console.error('Failed to parse message as JSON:', message);
                console.log("ERROR: " + error);
            }
        });

        socket.on('close', () => {
            console.log('WebSocket client disconnected');
            // Remove the disconnected client from all chat channels
            const username = socket_to_username_map.get(socket);
            channels.forEach((channel) => {
                if (channel.clients.has(socket)) {
                    channel.clients.delete(socket);
                    if (broadcastActiveUsers(channel, socket_to_username_map))
                        console.log("Broadcasting removal of " + username);
                }
            });
            socket_to_username_map.delete(socket);

        });
    });

    server.on('listening', () => {
        console.log('WebSocket server listening on port ' + socketPort + ' for multiple chat channels');
    });

    server.on('error', (error) => {
        console.error('WebSocket server error:', error);
    });

    server.on('close', () => {
        console.log('WebSocket server closed');
    });
}

// Handle incoming messages from Midjourney
discord_bot.on("messageCreate", async (message) => {
    try {
        if (message.author.tag == discord_bot.user.tag)
            return;
        const message_content = message.content;
        console.log(`\nMessage from ${message.author.username}: ${message_content}\n`);
        let channel = channels.find((r) => message_content.includes(r.job_id));
        if (channel) {
            for (const [key, value] of message.attachments) {
                const render_img_message = { "outfit_id": channel.outfit_id, "render_img": value.url };
                // Add rendered image to cache
                channel.last_rendered_image = value.url;
                if (broadcastJSON(channel, null, render_img_message))
                    console.log(`Successfully updated ${channel.outfit_id}'s image with Midjourney Render`);
                return;
            }
        }



        channel = channels.find((r) => message_content.includes(r.job_prompt));
        // If channel is found through initial prompt, add job id
        if (channel) {
            const start_job_id = message.content.lastIndexOf('<');
            const end_job_id = message.content.lastIndexOf('>');

            const job_id = message.content.substring(start_job_id, end_job_id);
            channel.job_id = job_id;
            console.log("Updated prompt " + channel.job_prompt + " to job id: " + job_id);
            return;

        }

        console.log("Error: received render for job without a channel");


    } catch (error) {
        console.log(`Error Ocurred while handling message:\n${message.content}\n\nError: ${error}`);
    }
});


// Run server
runWebSocketServer();