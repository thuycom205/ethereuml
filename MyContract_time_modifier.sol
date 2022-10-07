pragma solidity 0.5.1;

contract MyContract { 
     uint256 public peopleCount = 0;
     mapping(uint => Person) public people;
    

     uint openingTime = 1665122924;
      
   
     
     modifier onlyWhileOpen() {
        require (block.timestamp >= openingTime;
        _;
      } 
    
    
    struct Person 
     {
      
      uint _id;
      string _firstName;
      string _lastName;
     }
     
     constructor() public {
         owner = msg.sender;
     }
     
    function addPerson(
     string memory _firstName,
     string memory _lastName
     )
    public onlyWhileOpen { 

         incrementCount();
         people[peopleCount] = Person(peopleCount, _firstName, _lastName);
        
    }
    
    function incrementCount() internal  {
      peopleCount +=1;
 }
   
}
