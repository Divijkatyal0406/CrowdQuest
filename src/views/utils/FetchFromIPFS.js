const ipfsConnection = require('./ipfsConnection');

/**
 * 
 * @param {string} cid 
 * @returns data cid
 */
async function FetchFromIPFS(cid) {
    let ipfs = ipfsConnection.default;

    let data = await ipfs.cat(cid);

    return data;

}

export default FetchFromIPFS;