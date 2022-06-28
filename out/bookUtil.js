"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
exports.buildSocket = (socket) => {
    console.log('socket', socket);
    let content;
    const slicePageNum = { currnet: 1 };
    const curPageRef = { currnet: 1 };
    const stateRef = { current: 'prev' };
    socket.on('connect', () => {
        console.log('fuck socket');
    });
    socket.on('disconnect', () => {
        console.log('fuck dis socket');
    });
    socket.on('novelContent', (res) => {
        content = res;
        slicePageNum.currnet = Math.ceil(res.text.length / 60);
        if (stateRef.current == 'prev') {
            curPageRef.currnet = slicePageNum.currnet;
        }
        else {
            curPageRef.currnet = 1;
        }
        let startIdx = (curPageRef.currnet - 1) * 60;
        let endIdx = (curPageRef.currnet) * 60;
        vscode_1.window.setStatusBarMessage(content.text.slice(startIdx, endIdx));
    });
    socket.on('error', (res) => {
        console.log('socket error');
    });
    socket.on('reconnect', (res) => {
        console.log('socket reconnect');
    });
    const nextPage = () => {
        // curPageRef.currnet++;
        let startIdx = (curPageRef.currnet - 1) * 60;
        let endIdx = (curPageRef.currnet) * 60;
        vscode_1.window.setStatusBarMessage(content.text.slice(startIdx, endIdx));
    };
    const prevPage = () => {
        // curPageRef.currnet--;
        let startIdx = (curPageRef.currnet - 1) * 60;
        let endIdx = (curPageRef.currnet) * 60;
        vscode_1.window.setStatusBarMessage(content.text.slice(startIdx, endIdx));
    };
    return {
        content,
        curPageRef,
        slicePageNum,
        nextPage,
        stateRef,
        prevPage
    };
};
//# sourceMappingURL=bookUtil.js.map