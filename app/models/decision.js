/**
  * The decisionTree object defines the binary decision tree used to select a suggested book.
  * Its path is determined by the three "like" inputs, represented in this model *IN CAPS*, of a user.
  *
  * For example: 
  * A user who likes: choice A, then choice D, then choice E, will be shown selection 3.
  *
  *
  *                                                      -->  choice e  -->    selection 1
  *                                                     |
  *                                  -->  choice c  -->
  *                                 |                   |
  *                                 |                    -->  choice f  -->    selection 2
  *              --> *CHOICE A* -->
  *             |                   |                    --> *CHOICE E* -->   *SELECTION 3*
  *             |                   |                   |
  *             |                    --> *CHOICE D* -->
  *             |                                       |
  *             |                                        -->  choice f  -->    selection 4
  * category -->                                    
  *             |                                        -->  choice e  -->    selection 5
  *             |                                       |
  *             |                    -->  choice c  -->  
  *             |                   |                   |
  *             |                   |                    -->  choice f  -->    selection 6
  *              -->  choice b  -->
  *                                 |                    -->  choice e  -->    selection 7
  *                                 |                   |
  *                                  -->  choice d  --> 
  *                                                     |
  *                                                      -->  choice f  -->    selection 8 
  *
  *
  * The choice array and decision array are used to create and determine the path outlined.
  * The buildDecitionTree function uses these arrays to create the decision tree.
*/

const categories = ["baby", "toddler", "preschool"];

const choices = [
  [["babyA", "babyB"], ["babyC", "babyD"],["babyE", "babyF"]],
  [["toddlerA", "toddlerB"], ["toddlerC", "toddlerD"], ["toddlerE", "toddlerF"]],
  [["preschoolA", "preschoolB"], ["preschoolC", "preschoolD"],["preschoolE", "preschoolF"]]
  ];
  
const decisions = [
  ["baby1", "baby2", "baby3", "baby4", "baby5", "baby6", "baby7", "baby8"],
  ["toddler1", "toddler2", "toddler3", "toddler4", "toddler5", "toddler6", "toddler7", "toddler8"],
  ["preschool1", "preschool2", "preschool3", "preschool4", "preschool5", "preschool6", "preschool7", "preschool8"]
  ];
  
 function buildDecisionTree(choices, decisions) {
    const decisionTree = {};
    let decisionCounter = 0;
    
    choices.forEach(function(item, index){
      decisionCounter = 0;
      item[0].forEach(function(item2){
        decisionTree[item2] = {};
      item[1].forEach(function(item3){
        decisionTree[item2][item3] = {};
      item[2].forEach(function(item4){
        decisionTree[item2][item3][item4] = decisions[index][decisionCounter];
        decisionCounter ++;
      });
      });
      });
    });
    return decisionTree;
  };

let decisionTree = buildDecisionTree(choices, decisions);

function getDecision(array) {
  return decisionTree[array[0]][array[1]][array[2]]; 
};

function getNextChoice(tempUser) {
  let categoryIndex = categories.indexOf(tempUser.category);
  let selectionIndex = tempUser.bookLikes.length;
    
  return choices[categoryIndex][selectionIndex];
};

function getChoiceIndex(tempUser, bookChoice) {
  let choiceIndex;
  let categoryIndex = categories.indexOf(tempUser.category);
  let choiceArrays = choices[categoryIndex]
  
  choiceArrays.forEach(function(item, index) {
    if(item.indexOf(bookChoice) != -1) {
      choiceIndex = index}
    });
  
  return choiceIndex
};

module.exports = {buildDecisionTree, getDecision, getNextChoice, getChoiceIndex, categories}







  