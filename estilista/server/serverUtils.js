const WebSocket = require('ws');

const broadcastJSON = (channel, sender, messageJSON) => {
    try {
        channel.clients.forEach((client) => {
            if (client != sender && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageJSON));
            }
        });
        return true;
    } catch (error) {
        console.log("Error: " + error);
        return false;
    }
}

const broadcastActiveUsers = (channel, socket_to_username_map) => {
    // Send list of connected users
    let active_users = [];
    channel.clients.forEach(client => active_users.push(socket_to_username_map.get(client)));
    const active_users_message = { "outfit_id": channel.outfit_id, "active_users": active_users };
    return broadcastJSON(channel, null, active_users_message);
}

const sendErrorToClient = (socket, error_message) => {
    // Send error message if channel is not in memory
    console.log("ERROR: " + error_message);
    let error_json = { "error": error_message };
    socket.send(JSON.stringify(error_json));
}

const getMidjourneyPrompt = (prompt_context, channel) => {
    const item_urls = Array.from(channel.outfit_data.selected_items).map(item => item.img).join(' ');
    const item_weights = Array.from(channel.outfit_data.selected_items).map(_ => "--iw 1.5").join(' ');
    const prompt_context_string = prompt_context ? " " + prompt_context.trim() : '';
    let prompt = `/imagine ${item_urls} Individual wearing all clothing items provided. Full body realistic render. Frontal perspective with high resolution.${prompt_context || ''} ${item_weights} --version 5`;
    return prompt;
}

module.exports = { broadcastJSON, broadcastActiveUsers, sendErrorToClient, getMidjourneyPrompt }