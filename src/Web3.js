import Web3 from 'web3';
import CrowdQuest from '../abis/CrowdQuest.json';

async function loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData(){
    const web3=window.web3;
    const accounts=await web3.eth.getAccounts();
    // console.log(accounts[0]);
    this.setState({account:accounts[0]});
    const networkId=await web3.eth.net.getId();

    const networkData=CrowdQuest.networks[networkId];
    if(networkData){
        const crowdquest=web3.eth.Contract(CrowdQuest.abi,networkData.address)
        const questions=await crowdquest.methods.getAllQuestions().call();
      }
    else{
        window.alert('Contract not deployed on detected network');
    }
    
}

  export {loadWeb3};