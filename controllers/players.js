'use strict';

var PlayersService = require('../services/players');

class PlayersController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getPlayers.bind(this));
        this.router.get('/:id', this.getSinglePlayer.bind(this));
        this.router.post('/', this.postPlayer.bind(this));
        this.router.put('/:id', this.putPlayer.bind(this));
    }

    getPlayers(req, res) {
        // var players = PlayersService.getPlayers();
        // res.send(players);
        res.render('admin/blog/create', {
            title: 'aa',
            root: req.root,
            layout: 'blogLayout.hbs'
        });
    }

    getSinglePlayer(req, res) {
        var id = req.params.id;
        var player = PlayersService.getSinglePlayer(id);

        if (!player) {
            res.sendStatus(404);
        } else {
            res.send(player);
        }
    }

    putPlayer(req, res) {
        var id = req.params.id;
        var existingPlayer = PlayersService.getSinglePlayer(id);

        if (!existingPlayer) {
            let playerInfo = req.body;
            playerInfo.id = id;
            if (PlayersService.addPlayer(playerInfo)) {
                res.setHeader('Location', '/players/' + id);
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            if (PlayersService.updatePlayer(id, req.body)) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }
    }

    postPlayer(req, res) {
        var playerInfo = req.body;

        if (PlayersService.addPlayer(playerInfo)) {
            res.setHeader('Location', '/players/' + playerInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
}

module.exports = PlayersController;