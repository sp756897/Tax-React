// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.17;
pragma experimental ABIEncoderV2;

contract Tax {
    //Tax Contract

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

    modifier notPayer() {
        Payer memory p = payerbyaddr[msg.sender];
        require(p.id == 0, "Already Registered");
        _;
    }

    mapping(uint256 => Payer) public payers;
    mapping(address => Payer) public payerbyaddr;
    uint256 public payerCount;

    function getPayer(address _PayerAddr) public view returns (Payer memory) {
        return payerbyaddr[_PayerAddr];
    }

    function addPayer(string memory name, uint256 _salary) public notPayer {
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

    //Project Contract

    address public master;

    struct Department {
        string deptname;
        uint256 id;
        uint256 proCount;
        address payable mgrAddr;
        mapping(uint256 => Project) probyuint;
    }

    struct Project {
        uint256 deptno;
        string proname;
        uint256 grantrec;
        uint256 grantreq;
        uint256 reqCount;
        mapping(uint256 => Request) reqbyuint;
    }

    struct Request {
        string title;
        string desc;
        mapping(address => bool) voters;
        uint256 votersCount;
        uint256 moneyreq;
        bool granted;
    }

    uint256 public deptCount;
    mapping(uint256 => Department) public deptbyuint;
    mapping(address => Department) public deptbyaddr;

    modifier isMaster() {
        require(master == msg.sender);
        _;
    }

    modifier isHead(uint256 deptno) {
        require(deptbyuint[deptno].mgrAddr == msg.sender);
        _;
    }

    constructor(address mas) public {
        master = mas;
    }

    function getHead(address mgrAddr)
        public
        view
        returns (uint256, string memory)
    {
        Department storage head = deptbyaddr[mgrAddr];
        return (head.id, head.deptname);
    }

    function getdept(uint256 deptno)
        public
        view
        returns (uint256, string memory)
    {
        Department storage head = deptbyuint[deptno];
        return (head.id, head.deptname);
    }

    function getProject(uint256 deptno, uint256 pronum)
        public
        view
        returns (string memory, uint256)
    {
        Project storage pro = deptbyuint[deptno].probyuint[pronum];
        return (pro.proname, pro.reqCount);
    }

    function getRequest(
        uint256 deptno,
        uint256 prono,
        uint256 reqno
    )
        public
        view
        returns (
            string memory,
            string memory,
            uint256
        )
    {
        Request storage req = deptbyuint[deptno].probyuint[prono].reqbyuint[
            reqno
        ];
        return (req.title, req.desc, req.moneyreq);
    }

    function getProcount(uint256 deptno) public view returns (uint256) {
        return deptbyuint[deptno].proCount;
    }

    function getDeptcount() public view returns (uint256) {
        return deptCount;
    }

    function getReqCount(uint256 deptno, uint256 prono)
        public
        view
        returns (uint256)
    {
        return deptbyuint[deptno].probyuint[prono].reqCount;
    }

    function addDept(string memory deptname) public {
        Department storage newDept = deptbyuint[++deptCount];
        newDept.mgrAddr = msg.sender;
        newDept.deptname = deptname;
        newDept.id = deptCount;

        Department storage newDept2 = deptbyaddr[msg.sender];
        newDept2.mgrAddr = msg.sender;
        newDept2.deptname = deptname;
        newDept2.id = deptCount;
    }

    function createProject(string memory proname, uint256 deptno)
        public
        isHead(deptno)
    {
        Project storage newPro = deptbyuint[deptno].probyuint[
            ++deptbyuint[deptno].proCount
        ];
        newPro.deptno = deptno;
        newPro.proname = proname;
    }

    function voteforPro(
        uint256 deptno,
        uint256 prono,
        uint256 reqno
    ) public isPayer {
        require(
            deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].voters[
                msg.sender
            ] == false
        );
        deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].voters[
            msg.sender
        ] = true;
        deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].votersCount++;
    }

    function grantFund(
        uint256 deptno,
        uint256 prono,
        uint256 reqno
    ) public returns (bool) {
        require(
            deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].votersCount >
                (payerCount / 2),
            "Not enough Votes"
        );
        require(
            deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].moneyreq <
                address(this).balance,
            "Not enough balance"
        );
        require(
            deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].granted ==
                false,
            "Already Granted"
        );
        deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].granted = true;
        return
            deptbyuint[deptno].mgrAddr.send(
                deptbyuint[deptno].probyuint[prono].reqbyuint[reqno].moneyreq
            );
    }

    function requestFund(
        uint256 deptno,
        uint256 prono,
        uint256 money,
        string memory title,
        string memory desc
    ) public isHead(deptno) {
        Request storage newReq = deptbyuint[deptno].probyuint[prono].reqbyuint[
            ++deptbyuint[deptno].probyuint[prono].reqCount
        ];
        newReq.title = title;
        newReq.desc = desc;
        newReq.moneyreq = money;
        newReq.granted = false;
    }
}
