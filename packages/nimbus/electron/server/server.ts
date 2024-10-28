import { app } from "./app";

require('dotenv').config();


const PORT = process.env.PORT || 5000;
function nodeServer() {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export {nodeServer}