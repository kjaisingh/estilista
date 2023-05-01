const socketURL = 'ws://localhost';
const socketPort = 3000;

const casual_outfit = {
    "image": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
    "name": "Casual",
    "selectedItems": [
        {
            id: 1,
            name: 'Jean Shirt', category: 'Tops', img: "https://drive.google.com/uc?export=view&id=1rucpUNkAu8I1TUNzi9QI_aNsRgUWqfPL"
        },
        {
            id: 4,
            name: 'Black Fedora', category: 'Bottoms', img: "https://drive.google.com/uc?export=view&id=1usYj2EL_7Bx5iK8TUh25HL0Zxh0pupeD"
        },
        {
            id: 6,
            name: 'Floral Skirt', category: 'Hats', img: "https://drive.google.com/uc?export=view&id=1qnHCU001Lh9-df0kQHJXY2zeKMoJkaJW"
        },
        {
            id: 7,
            name: 'Shoes', category: 'Shoes', img: "https://drive.google.com/uc?export=view&id=1TrwfPi3RVdab5ZfwXKKfAUupGRl3lSk9"
        }]
}

const default_outfit = {
    "name": "My Outfit",
    "selectedItems": [],
    "image": "",
    "channel_id": "new channel id"
}

module.exports = {
    casual_outfit,
    default_outfit,
    socketPort,
    socketURL
};