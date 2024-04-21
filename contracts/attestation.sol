// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

contract Zkwarden is Ownable {
    ISP public spInstance;
    uint64 public schemaId;
    event AttestationCreated(uint64 attestationId);

    constructor() Ownable(msg.sender) { }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }
    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }
    function confirmLocation(string memory data_) external returns (uint64) {
        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encode(msg.sender);
        bytes memory data = abi.encode(msg.sender, data_);

        Attestation memory a = Attestation({
            schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: data
        });

        uint64 attestationId = spInstance.attest(a, "", "", "");
        emit AttestationCreated(attestationId);
        return attestationId;
    }
}
