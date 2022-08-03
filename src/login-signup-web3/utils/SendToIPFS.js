const ipfsConnection = require('./ipfsConnection');

/**
 * 
 * @param {Object} data 
 * @returns data cid
 */
async function SendToIPFS(data) {
    let ipfs = ipfsConnection.default;
    let cid;
    await ipfs.add(data)
        .then(res => {
            cid = res;
        })
        .catch(err => console.error(err));

    return cid;
}

export default SendToIPFS;