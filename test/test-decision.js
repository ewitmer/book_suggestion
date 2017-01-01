const decision = require('../app/models/decision');
var chai = require('chai');

// Using Should style 
var should = chai.should();


describe('decision', function() {

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

        let decisionTree = decision.buildDecisionTree(choices, decisions);

        const correct = { 
            babyA: 
                { babyC: { babyE: 'baby1', babyF: 'baby2' },
                     babyD: { babyE: 'baby3', babyF: 'baby4' } },
            babyB: 
                 { babyC: { babyE: 'baby5', babyF: 'baby6' },
                     babyD: { babyE: 'baby7', babyF: 'baby8' } },
            toddlerA: 
                 { toddlerC: { toddlerE: 'toddler1', toddlerF: 'toddler2' },
                     toddlerD: { toddlerE: 'toddler3', toddlerF: 'toddler4' } },
            toddlerB: 
                 { toddlerC: { toddlerE: 'toddler5', toddlerF: 'toddler6' },
                     toddlerD: { toddlerE: 'toddler7', toddlerF: 'toddler8' } },
            preschoolA: 
                 { preschoolC: { preschoolE: 'preschool1', preschoolF: 'preschool2' },
                     preschoolD: { preschoolE: 'preschool3', preschoolF: 'preschool4' } },
            preschoolB: 
                 { preschoolC: { preschoolE: 'preschool5', preschoolF: 'preschool6' },
                     preschoolD: { preschoolE: 'preschool7', preschoolF: 'preschool8' } } };

        let tempUser = {    
            category : "baby",
            bookLikes : ["0141385774"],
            email : undefined 
        };

        let tempUser_1 = {    
            category : "toddler",
            bookLikes : ["1408308460", "1844285138"],
            email : undefined 
        };

        let tempUser_2 = {    
            category : "preschool",
            bookLikes : [],
            email : "test@user.com" 
        };

    it('should produce an object that serves as a decision tree', function() {

        decisionTree.should.equal.correct;
        
    });

    it('should return the correct recommendation given a selection array', function() {

        decision.getDecision(["0141385774", "9780060207069", "0689841213"]).should.equal("0399215921");
        decision.getDecision(["9780805017441", "9780060207069", "0689841213"]).should.equal("0152056882");
        decision.getDecision(["0141385774", "9780547547718", "0547770227"]).should.equal("1905417845");
        decision.getDecision(["1408308460", "0920668372", "0061119725"]).should.equal("0670062405");
        decision.getDecision(["141694737X", "0920668372", "0062305948"]).should.equal("0375988580");
        decision.getDecision(["1408308460", "1844285138", "0061119725"]).should.equal("0763671630");
        decision.getDecision(["1101631384", "0385371985", "0007513771"]).should.equal("1613125305");
        decision.getDecision(["0547771282", "0385371985", "0062065602"]).should.equal("1101642335");
        decision.getDecision(["0547771282", "0060254920", "0007513771"]).should.equal("1452154805"); 

    });

    it('should get the correct next selection given a users current selections', function() {

        decision.getNextChoice(tempUser)[0].should.equal("9780060207069");
        decision.getNextChoice(tempUser)[1].should.equal("9780547547718");
        decision.getNextChoice(tempUser_1)[0].should.equal("0061119725");
        decision.getNextChoice(tempUser_1)[1].should.equal("0062305948");
        decision.getNextChoice(tempUser_2)[0].should.equal("1101631384");
        decision.getNextChoice(tempUser_2)[1].should.equal("0547771282"); 

    });

    it('should place the current choice in the correct position in the array', function() {

        decision.getChoiceIndex(tempUser, "0141385774").should.equal(0);
        decision.getChoiceIndex(tempUser, "9780060207069").should.equal(1);
        decision.getChoiceIndex(tempUser, "0547770227").should.equal(2);
        decision.getChoiceIndex(tempUser_1, "141694737X").should.equal(0);
        decision.getChoiceIndex(tempUser_1, "1844285138").should.equal(1);
        decision.getChoiceIndex(tempUser_1, "0061119725").should.equal(2);
        decision.getChoiceIndex(tempUser_2, "1101631384").should.equal(0);
        decision.getChoiceIndex(tempUser_2, "0385371985").should.equal(1);
        decision.getChoiceIndex(tempUser_2, "0062065602").should.equal(2);


    });

});
