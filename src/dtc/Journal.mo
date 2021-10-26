import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import Nat64 "mo:base/Nat64";


shared(msg) actor class Journal (principal : Principal){
    let callerId = msg.caller;

    type JournalEntry = {
        text: Text;
        location: Text;
        date: Text;
    }; 

    type Error ={
        #NotFound;
        #AlreadyExists;
    };

    type Bio = {
        name : Text;
        dob: Text;
        birthPlace: Text;
        siblings: Text;
        children: Text;
        biography: Text;
    };


    //Application State
    //stable makes it so that the variable persists across updates to the canister
    //var refers to the data being a variable
    //profiles is the name of the variable
    //Trie.Trie is the data type. a Trie is a key/value map where Nat is the key and Profile is the data type
    // and it has been initialized as empty. hence the Trie.empty()


    private stable var journal : Trie.Trie<Nat, JournalEntry> = Trie.empty();
    private stable var biography : Bio = {
        name = "";
        dob = "";
        birthPlace = "";
        siblings = "";
        children = "";
        biography = "";
    };

    private stable var numberOfJournalEntries : Nat = 0;

    private var capacity = 1000000000000000000;

    private var balance = Cycles.balance();

    public shared(msg) func wallet_balance() : async Nat {
    return balance
  };

  // Return the cycles received up to the capacity allowed
  public func wallet_receive() : async { accepted: Nat64 } {
    let amount = Cycles.available();
    let limit : Nat = capacity - balance;
    let accepted =
      if (amount <= limit) amount
      else limit;
    let deposit = Cycles.accept(accepted);
    assert (deposit == accepted);
    balance += accepted;
    { accepted = Nat64.fromNat(accepted) };
  };

    public func createEntry( journalEntry : JournalEntry) : async Result.Result<(), Error> {
        numberOfJournalEntries += 1;
        
        let (newJournal, oldJournal) = Trie.put(
            journal,
            natKey(numberOfJournalEntries),
            Nat.equal,
            journalEntry
        );

        journal := newJournal;


        #ok(());

    };

    public func readJournal() : async Result.Result<Trie.Trie<Nat,JournalEntry>,Error> {
        return #ok(journal);
    };

    public func readJournalEntry(key : Nat): async Result.Result<JournalEntry, Error> {
        let entry = Trie.find(
            journal,
            natKey(key),
            Nat.equal
        );

        switch(entry){
            case null{
                #err(#NotFound);
            };
            case(? v){
                #ok(v);
            };
        }
    };

    public func updateJournal(key: Nat, journalEntry: JournalEntry) : async Result.Result<(),Error> {

        let entry = Trie.find(
            journal,
            natKey(key),
            Nat.equal
        );

        switch(entry){
            case null{
                #err(#NotFound);
            };
            case (? v){
                let (newJournal, oldJournal) = Trie.put(
                    journal,
                    natKey(key),
                    Nat.equal,
                    journalEntry
                );

                journal := newJournal;

                #ok(());

            }
        }

    };

    public func deleteJournalEntry(key: Nat) : async Result.Result<(),Error> {
        let entry = Trie.find(
            journal,
            natKey(key),
            Nat.equal,
        );

        switch(entry){
            case null{
                #err(#NotFound);
            };
            case (? v){
                let updatedJournal = Trie.replace(
                    journal,
                    natKey(key),
                    Nat.equal,
                    null
                );

                journal := updatedJournal.0;
                #ok(());

            };
        };

    };
   
    private  func key(x: Principal) : Trie.Key<Principal> {
        return {key = x; hash = Principal.hash(x)}
    };

    private func natKey(x: Nat) : Trie.Key<Nat> {
        return {key = x; hash = Hash.hash(x)}
    };

    private func textKey(x: Text) : Trie.Key<Text> {
        return {key = x; hash = Text.hash(x)}
    };
}