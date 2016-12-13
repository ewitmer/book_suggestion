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

        const decisionTree = decision.buildDecisionTree(choices, decisions);

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
            bookLikes : ["babyA"],
            email : undefined 
        };

        let tempUser_1 = {    
            category : "toddler",
            bookLikes : ["toddlerA", "toddlerC"],
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

        decision.getDecision(["babyA", "babyC", "babyE"]).should.equal("baby1");
        decision.getDecision(["babyB", "babyC", "babyE"]).should.equal("baby5");
        decision.getDecision(["babyA", "babyD", "babyF"]).should.equal("baby4");
        decision.getDecision(["toddlerA", "toddlerD", "toddlerE"]).should.equal("toddler3");
        decision.getDecision(["toddlerB", "toddlerD", "toddlerF"]).should.equal("toddler8");
        decision.getDecision(["toddlerA", "toddlerC", "toddlerE"]).should.equal("toddler1");
        decision.getDecision(["preschoolA", "preschoolC", "preschoolE"]).should.equal("preschool1");
        decision.getDecision(["preschoolB", "preschoolC", "preschoolF"]).should.equal("preschool6");
        decision.getDecision(["preschoolB", "preschoolD", "preschoolE"]).should.equal("preschool7");

    });

    it('should get the correct next selection given a users current selections', function() {

        decision.getNextChoice(tempUser)[0].should.equal("babyC");
        decision.getNextChoice(tempUser)[1].should.equal("babyD");
        decision.getNextChoice(tempUser_1)[0].should.equal("toddlerE");
        decision.getNextChoice(tempUser_1)[1].should.equal("toddlerF");
        decision.getNextChoice(tempUser_2)[0].should.equal("preschoolA");
        decision.getNextChoice(tempUser_2)[1].should.equal("preschoolB");

    });

    it('should place the current choice in the correct position in the array', function() {

        decision.getChoiceIndex(tempUser, "babyA").should.equal(0);
        decision.getChoiceIndex(tempUser, "babyC").should.equal(1);
        decision.getChoiceIndex(tempUser, "babyF").should.equal(2);
        decision.getChoiceIndex(tempUser_1, "toddlerB").should.equal(0);
        decision.getChoiceIndex(tempUser_1, "toddlerC").should.equal(1);
        decision.getChoiceIndex(tempUser_1, "toddlerE").should.equal(2);
        decision.getChoiceIndex(tempUser_2, "preschoolA").should.equal(0);
        decision.getChoiceIndex(tempUser_2, "preschoolC").should.equal(1);
        decision.getChoiceIndex(tempUser_2, "preschoolF").should.equal(2);


    });

});
