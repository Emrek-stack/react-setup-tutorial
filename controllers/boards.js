'use strict';

var BoardsService = require('../services/boards');

class BoardsController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getBoards.bind(this));
        this.router.get('/:id', this.getSingleBoard.bind(this));
        this.router.post('/', this.postBoard.bind(this));
        this.router.put('/:id', this.putBoard.bind(this));
    }

    getBoards(req, res) {
        var boards = BoardsService.getBoards();
        res.send(boards);
    }

    getSingleBoard(req, res) {
        var id = req.params.id;
        var board = BoardsService.getSingleBoard(id);

        if (!board) {
            res.sendStatus(404);
        } else {
            res.send(board);
        }
    }

    putBoard(req, res) {
        var id = req.params.id;
        var existingBoard = BoardsService.getSingleBoard(id);

        if (!existingBoard) {
            let board = BoardsService.addBoard(req.body.boardName, req.body.rankDirection);
            if (board) {
                res.setHeader('Location', '/leaderboards/' + board.id);
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            if (BoardsService.updateBoard(id, req.body)) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }
    }

    postBoard(req, res) {
        var board = BoardsService.addBoard(req.body.boardName, req.body.rankDirection);

        if (board) {
            res.setHeader('Location', '/leaderboards/' + board.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
}

module.exports = BoardsController;