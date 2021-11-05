// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.17;
pragma experimental ABIEncoderV2;

contract Tax {
    struct Payer {
        uint256 id;
        string name;
        uint256 tax;
        uint256 salary;
        address PayerAddr;
    }

    modifier minTax() {
        require(msg.value >= 1 wei);
        _;
    }

    modifier isPayer() {
        Payer memory p = payerbyaddr[msg.sender];
        require(p.PayerAddr == msg.sender);
        _;
    }

    mapping(uint256 => Payer) public payers;
    mapping(address => Payer) public payerbyaddr;
    uint256 public payerCount;

    function getPayer(address _PayerAddr) public view returns (Payer memory) {
        return payerbyaddr[_PayerAddr];
    }

    function addPayer(string memory name, uint256 _salary) public {
        payerCount++;
        payers[payerCount] = Payer(payerCount, name, 0, _salary, msg.sender);
        payerbyaddr[msg.sender] = Payer(
            payerCount,
            name,
            0,
            _salary,
            msg.sender
        );
    }

    function payTax() public payable minTax isPayer {
        payerbyaddr[msg.sender].tax += msg.value;
        Payer memory temp = payerbyaddr[msg.sender];
        payers[temp.id].tax += msg.value;
    }

    function getSummary() public view returns (uint256) {
        return address(this).balance;
    }
}
