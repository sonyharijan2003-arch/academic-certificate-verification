const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();

app.use(cors());
app.use(express.json());

// Ganache connection
const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:7545"
);

// Your deployed smart contract address
const contractAddress =
    "0x9B158b2778D3b1A4C544c7B6D7D5186cdB083119";

// Smart contract ABI
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "certId",
                "type": "uint256"
            }
        ],
        "name": "verifyCertificate",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Connect to smart contract
const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider
);


// Home route
app.get("/", (req, res) => {
    res.send("Blockchain Certificate Verification Backend is running!");
});


// Verify Certificate API
app.get("/verify/:id", async (req, res) => {

    try {

        const certId = req.params.id;

        const certificate =
            await contract.verifyCertificate(certId);

        if (!certificate[0]) {

            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });

        }

        res.json({
            success: true,
            certificate: {
                id: certId,
                studentName: certificate[0],
                course: certificate[1],
                issueDate: certificate[2].toString()
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to verify certificate"
        });
    }
});


// Start server
const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Backend server running at http://localhost:${PORT}`
    );

});