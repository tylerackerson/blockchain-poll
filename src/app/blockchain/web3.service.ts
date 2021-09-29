import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const contractAbi = require("./contract-abi.json");
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress = '0x5C208334Cb499DC7D8D9d4f0eCdE353bb5Dbe3f5';

  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);

      window.ethereum.enable().catch((err) => {
        console.log(err);
      });
    } else {
      console.warn('Metamask not found. Install or enable it.');
    }
  }

  async getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || '')
  }

  async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
    const acct = await this.getAccount();

    this.contract
      .methods[fnName](...args)
      .send({ from: acct })

    /** Examples:
     - executeTransaction("createPoll", 1, 'http://', [0, 2, 4])
     - executeTransaction("vote", 1, 2)
     */
  }

  async call(fnName: string, ...args: any[]): Promise<void> {
    const acct = await this.getAccount();

    return this.contract
      .methods[fnName](...args)
      .call({ from: acct })

    /** Example:
     - call("getPolls")
     - call("getVoter", 'asdf')
     */
  }
}
