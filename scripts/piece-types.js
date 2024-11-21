const CORNERS = {
    getPieceBtn() {
        return document.getElementById("btn-corners");
    },

    getComm(letterPair) {
        return CORNER_COMMS[letterPair];
    },

    getCommType(letterPair) {
        return CORNER_TYPES[letterPair];
    }
};

const EDGES = {
    getPieceBtn() {
        return document.getElementById("btn-edges");
    },

    getComm(letterPair) {
        return EDGE_COMMS[letterPair];
    },

    getCommType(letterPair) {
        return EDGE_TYPES[letterPair];
    }
};