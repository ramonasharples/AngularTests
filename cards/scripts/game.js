'use strict';
//Game models and such

function Tile(title) {
	this.title = title;
	this.flipped = false;
}

Tile.prototype.flip = function() {
	this.flipped = !this.flipped;
}

function Game(tileNames) {
	var tileDeck = makeDeck(tileNames);

	this.grid = makeGrid(tileDeck);
	this.message = Game.MESSAGE_CLICK;
	this.unmatchedPairs = tileNames.length;
	this.attempts = 0;

	this.flipTile = function(tile) {
		if (tile.flipped) {
			return;
		}
		
		tile.flip();

		if (!this.firstPick || this.secondPick) {
			if (this.secondPick) {
				this.firstPick.flip();
				this.secondPick.flip();
				this.firstPick = this.secondPick = undefined;
			}

			this.firstPick = tile;
			this.message = Game.MESSAGE_ANOTHER;
		} 
		else {
			if (this.firstPick.title === tile.title) {
				this.unmatchedPairs--;
				this.attempts++;
				this.message = (this.unmatchedPairs > 0) ? Game.MESSAGE_MATCH : Game.MESSAGE_WON;
				this.firstPick = this.secondPick = undefined;
			} 
			else {
				this.secondPick = tile;
				this.attempts++;
				this.message = this.firstPick.title.slice(0, 1)[0].toUpperCase() + this.firstPick.title.slice(1, this.firstPick.title.length) + " and " + this.secondPick.title + "? Those don't match!";
			}
		}
	}
}

Game.MESSAGE_CLICK = "Pick a tile";
Game.MESSAGE_ANOTHER = "Pick another tile";
Game.MESSAGE_MISS = "Those don't match!";
Game.MESSAGE_MATCH = "Good job!";
Game.MESSAGE_WON = "You got them all!";

function makeDeck(tileNames) {
	var tileDeck = [];
	tileNames.forEach(function (name) {
		tileDeck.push(new Tile(name));
		tileDeck.push(new Tile(name));
		//puts two of every tile in the deck
	});

	return tileDeck;
}

function makeGrid(tileDeck) {
	var gridDimension = Math.sqrt(tileDeck.length);
	var grid = [];

	for (var row = 0; row < gridDimension; row++) {
		grid[row] = [];
		for (var col = 0; col < gridDimension; col++) {
			grid[row][col] = removeRandomTile(tileDeck);
		}
	}

	return grid;
}

function removeRandomTile(tileDeck) {
	var i = Math.floor(Math.random()*tileDeck.length);
	return tileDeck.splice(i, 1)[0];
}