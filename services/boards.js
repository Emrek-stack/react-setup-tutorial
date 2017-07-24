'use strict';

var uuid = require('node-uuid');

class LeaderBoardService {
    constructor() {
        this.boards = [];
    }

    getBoards() {
        return this.boards;
    }

    getSingleBoard(boardId) {
        return this.boards.filter(b => b.id === boardId)[0] || null;
    }

    addBoard(boardName, rankDirection) {
        var existingBoard = this.boards.filter(b => b.boardName === boardName).length;
        if (existingBoard) {
            return null;
        }

        var board = { boardName: boardName, rankDirection: rankDirection };
        board.id = uuid.v4();

        this.boards.push(board);

        return board;
    }

    updateBoard(boardId, info) {
        var board = this.getSingleBoard(boardId);
        if (board) {
            board.boardName = info.boardName ? info.boardName : board.boardName;
            board.rankDirection = info.rankDirection ? info.rankDirection : board.rankDirection;

            return true;
        }
        return false;
    }
}

module.exports = new LeaderBoardService();