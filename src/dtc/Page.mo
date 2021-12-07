import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";


shared(msg) actor class Page (principal : Principal){
    let callerId = msg.caller;

    type PageEntry = {
        entryTitle: Text;
        text: Text;
        location: Text;
        date: Int;
        lockTime: Int;
        timeTillUnlock: Int;
    }; 

    type PageFile = {
        file: Trie.Trie<Text, Blob>;
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


    private stable var page : Trie.Trie<Nat, PageEntry> = Trie.empty();

    private stable var files : Trie.Trie2D<Text,Text,Blob> = Trie.empty();

    private stable var biography : Bio = {
        name = "";
        dob = "";
        birthPlace = "";
        siblings = "";
        children = "";
        biography = "";
    };

    private stable var numberOfPageEntries : Nat = 0;

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

    public func createEntry( pageEntry : PageEntry) : async Result.Result<(), Error> {
        numberOfPageEntries += 1;
        
        let (newPage, oldPage) = Trie.put(
            page,
            natKey(numberOfPageEntries),
            Nat.equal,
            pageEntry
        );

        page := newPage;

        #ok(());
            
        

    };

    public func createFile(fileId: Text ,chunkId : Text, blobChunk : Blob) : async Result.Result<(), Error> {

        let existingFile = Trie.find(
            files,
            textKey(fileId),
            Text.equal
        );

        switch(existingFile){
            case null{
                let updatedFiles = Trie.put2D(
                    files,
                    textKey(fileId),
                    Text.equal,
                    textKey(chunkId),
                    Text.equal,
                    blobChunk
                );
                files := updatedFiles;
                #ok(());
            };
            case (? fileExists){
                #err(#AlreadyExists);
            };
        };
    };

    public func readPage() : async Result.Result<(Trie.Trie<Nat,PageEntry>, Bio),Error> {
        return #ok((page, biography));
    };

    public func readPageEntry(key : Nat): async Result.Result<PageEntry, Error> {
        let entry = Trie.find(
            page,
            natKey(key),
            Nat.equal
        );


        switch(entry){
            case null{
                #err(#NotFound);
            };
            case(? entryValue){
                #ok(entryValue);
            };
        }
    };

    public func readPageFile (fileId : Text) : async Result.Result<(Trie.Trie<Text,Blob>),Error> {

        let file = Trie.find(
            files,
            textKey(fileId),
            Text.equal,
        );

        switch(file){
            case null{
                #err(#NotFound);
            };
            case (? existingFile){
                #ok(existingFile);
            };
        };
    };



    public func updatePageEntry(key: Nat, pageEntry: PageEntry) : async Result.Result<(),Error> {

        let entry = Trie.find(
            page,
            natKey(key),
            Nat.equal
        );

        switch(entry){
            case null{
                #err(#NotFound);
            };
            case (? v){
                let (newPage, oldEntryValue) = Trie.put(
                    page,
                    natKey(key),
                    Nat.equal,
                    pageEntry
                );

                page := newPage;

                #ok(());

            }
        }

    };

    public func updatePageEntryFile(fileId: Text, chunkId: Text, blobChunk : Blob) : async Result.Result<(),Error> {

        let file = Trie.find(
            files,
            textKey(fileId),
            Text.equal
        );

        switch(file){
            case null{
                #err(#NotFound);
            };
            case (? existingFile){
                let updatedFiles = Trie.put2D(
                    files,
                    textKey(fileId),
                    Text.equal,
                    textKey(chunkId),
                    Text.equal,
                    blobChunk
                );

                files := updatedFiles;
                #ok(());

            }
        }

    };



    public func deletePageEntry(key: Nat) : async Result.Result<(),Error> {
        let entry = Trie.find(
            page,
            natKey(key),
            Nat.equal,
        );

        switch(entry){
            case null{
                #err(#NotFound);
            };
            case (? v){
                let updatedPage = Trie.replace(
                    page,
                    natKey(key),
                    Nat.equal,
                    null
                );

                page := updatedPage.0;
                #ok(());

            };
        };

    };

    public func deletePageEntryFile(fileId: Text) : async Result.Result<(),Error> {
        let entryFiles = Trie.find(
            files,
            textKey(fileId),
            Text.equal,
        );

        switch(entryFiles){
            case null{
                #err(#NotFound);
            };
            case (? v){
                let (updatedFiles, existingFiles) = Trie.replace(
                    files,
                    textKey(fileId),
                    Text.equal,
                    null
                );

                files := updatedFiles;
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