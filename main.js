const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = 0;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.nonce + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "02/04/2022", "Genesis Block", "0");
    }
}

let blockChain = new Blockchain();
console.log("genesis block" + JSON.stringify(blockChain.chain[0], null, 4));