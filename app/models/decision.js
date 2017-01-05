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

// Models will need to be updated if these are changed
const categories = ["baby", "toddler", "preschool"];

// These can be changed, but confirm the Google Books API contains data for the specific ISBN
const choices = [
  [["0141385774", "9780805017441"], ["9780060207069", "9780547547718"],["0689841213", "0547770227"]],
  [["9781841215655", "141694737X"], ["1844285138", "0920668372"], ["0061119725", "0062305948"]],
  [["1101631384", "0547771282"], ["0385371985", "0060254920"],["0007513771", "0062065602"]]
  ];
  
// These can be changed, but confirm the Google Books API contains data for the specific ISBN
const decisions = [
  ["0399215921", "0547349203", "0698152239", "1905417845", "0152056882", "015204907X", "0152055339", "1452136599"],
  ["0763671630", "0064438368", "1101647507", "0763616672", "1452109818", "0061857793", "1481400932", "0375988580"],
  ["1613125305", "0394823370", "0152062874", "0698176758", "0670013250", "1101642335", "1452154805", "0333710924"]
  ];
  
// Builds the decision tree described above
function buildDecisionTree(choices, decisions) {
  const decisionTree = {};
  let decisionCounter = 0;
    
  choices.forEach((item, index) => {
    decisionCounter = 0;
    item[0].forEach((item2) => {
      decisionTree[item2] = {};
    item[1].forEach((item3) => {
      decisionTree[item2][item3] = {};
    item[2].forEach((item4) => {
      decisionTree[item2][item3][item4] = decisions[index][decisionCounter];
      decisionCounter ++;
    });
    });
    });
  });
    return decisionTree;
};

// Builds deciision tree
let decisionTree = buildDecisionTree(choices, decisions);

// Gets decision based on user selections and decision tree
function getDecision(array) {
  return decisionTree[array[0]][array[1]][array[2]]; 
};

// Fetches next selection choices
function getNextChoice(tempUser) {
  let categoryIndex = categories.indexOf(tempUser.category);
  let selectionIndex = tempUser.bookLikes.length;
    
  return choices[categoryIndex][selectionIndex];
};

// Used to validate the current choice goes into the correct position in the array
function getChoiceIndex(tempUser, bookChoice) {
  let choiceIndex;
  let categoryIndex = categories.indexOf(tempUser.category);
  let choiceArrays = choices[categoryIndex]
  
  choiceArrays.forEach((item, index) => {
    if(item.indexOf(bookChoice) != -1) {
      choiceIndex = index}
    });
  
  return choiceIndex
};

module.exports = {buildDecisionTree, getDecision, getNextChoice, getChoiceIndex, categories}







  