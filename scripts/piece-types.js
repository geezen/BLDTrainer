const CORNERS = {
    getPieceBtn() {
        return document.getElementById("btn-corners");
    },

    getComm(letterPair) {
        return CORNER_COMMS[letterPair];
    }
};

const EDGES = {
    getPieceBtn() {
        return document.getElementById("btn-edges");
    },

    getComm(letterPair) {
        return EDGE_COMMS[letterPair];
    }
};