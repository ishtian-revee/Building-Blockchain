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

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let blockChain = new Blockchain();

blockChain.addNewBlock(new Block(1, "03/04/2022", {amount: 10}));
blockChain.addNewBlock(new Block(2, "04/04/2022", {amount: 35}));
blockChain.addNewBlock(new Block(3, "5/04/2022", {amount: 69}));

console.log("genesis block" + JSON.stringify(blockChain.chain, null, 4));