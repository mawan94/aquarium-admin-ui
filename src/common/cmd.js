const CMD = {
    /**
     * REQ_PACKET
     */
    LOGIN_REQ: {cmd: 1, adminId: ''},//adminId： require
    CLOSE_CONNECT_REQ: {cmd: 3, adminId: ''},//adminId： require

    /**
     * RES_PACKET
     */
    EXPORT_RES: {cmd: 2, success: '', msg: ''},

};

export default CMD
