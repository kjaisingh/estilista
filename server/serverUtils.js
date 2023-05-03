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

const getMidjourneyPrompt = (prompt_context, user_profile_img, channel) => {
    const item_urls = Array.from(channel.outfit_data.selected_items).map(item => item.img).join(' ');
    const item_weights = Array.from(channel.outfit_data.selected_items).map(_ => "--iw 1.5").join(' ');
    const prompt_context_string = prompt_context ? prompt_context.trim() + " " : '';
    const profile_img_string = user_profile_img ? user_profile_img + " " : '';
    let prompt = `/imagine ${profile_img_string}${item_urls} Individual wearing all clothing items provided. Full body, 8k quality, hyper-realistic render. Canon EOS R6 Mark II Mirrorless Camera. Include full background. ${user_profile_img ? "Show full face. " : ""}Frontal perspective. ${prompt_context_string}${item_weights} --version 5`;
    return prompt;
}

module.exports = { broadcastJSON, broadcastActiveUsers, sendErrorToClient, getMidjourneyPrompt }