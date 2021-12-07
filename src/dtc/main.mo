import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal"; 
import Time "mo:base/Time";
import Page "Page";
import Cycles "mo:base/ExperimentalCycles";

actor class User(){

    type Profile = {
        userName: Text;
        id: Principal;
    };

    type ProfileInput = {
        userName: Text;
    };

    type AmountAccepted = {
        accepted: Nat64
    };

    type EntryKey = {
        entryKey: Nat;
    };

    type PageFile = {
        file1: ?Blob;
        file2: ?Blob;
    };

    type PageEntry = {
        entryTitle: Text;
        text: Text;
        location: Text;
        date: Int;
        lockTime: Int;
        timeTillUnlock: Int;
    };

    type Bio = {
        name : Text;
        dob: Text;
        birthPlace: Text;
        siblings: Text;
        children: Text;
        biography: Text;
    };

    // This "Error" type is known as a varient. The attributes of varients are tagged with the hashtag and there is no need to specify the data type of the attribute because varients only attributes of a specific data type. 
    type Error ={
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
        #NoInputGiven;
    };

    //Application State
    //stable makes it so that the variable persists across updates to the canister
    //var refers to the data being a variable
    //profiles is the name of the variable
    //Trie.Trie is the data type. a Trie is a key/value map where Nat is the key and Profile is the data type
    // and it has been initialized as empty. hence the Trie.empty()

    stable var profiles : Trie.Trie<Principal, Profile> = Trie.empty();

    


    //Result.Result returns a varient type that has attributes from success case(the first input) and from your error case (your second input). both inputs must be varient types. () is a unit type.
    public shared(msg) func create (profile: ProfileInput) : async Result.Result<AmountAccepted,Error> {

        let callerId = msg.caller;

        //Reject Anonymous User
        //if(Principal.toText(msg.caller) == "2vxsx-fae"){
        //    return #err(#NotAuthorized);
        //};

        let userProfile: Profile = {
            userName = profile.userName;
            id = callerId;
        };

        let (newProfiles, existing) = Trie.put(
            profiles,       //Target Trie
            key(callerId), //Key
            Principal.equal,       //Equality Checker
            userProfile
        );

        // If there is an original value, do not update
        switch(existing) {
            case null {

                Cycles.add(100_000_000_000);
                let page = await Page.Page(callerId);
                Cycles.add(100_000_000_000);
                let amountAccepted = await page.wallet_receive();
                profiles := newProfiles;
                //No need to write return when attribute of a varient is being returned
                return #ok(amountAccepted);
            };
            case ( ? v) {
                //No need to write return when attribute of a varient is being returned
                return #err(#NotAuthorized);
            }
        };
    };

    //read Page
    public shared(msg) func readPage () : async Result.Result<(Trie.Trie<Nat,PageEntry>, Bio), Error> {

        //Reject Anonymous User
        //if(Principal.toText(msg.caller) == "2vxsx-fae"){
        //    return #err(#NotAuthorized);
        //};

        let callerId = msg.caller;

        let result = Trie.find(
            profiles,
            key(callerId),
            Principal.equal
        );

        switch(result){
            case null{
                return #err(#NotFound);
            };
            case(? v){
                let page = await Page.Page(callerId); 
                let userPage = await page.readPage();
                return userPage;
                
            };
        };

        // need to replace Page with Page(callerId)
        
    };

    public shared(msg) func readEntry(entryKey: EntryKey) : async Result.Result<PageEntry, Error> {

        //Reject Anonymous User
        //if(Principal.toText(msg.caller) == "2vxsx-fae"){
        //    return #err(#NotAuthorized);
        //};

        let callerId = msg.caller;
        let result = Trie.find(
            profiles,
            key(callerId),
            Principal.equal
        );
        switch(result){
            case null{
                #err(#NotAuthorized)
            };
            case(? v){
                let page = await Page.Page(callerId);
                let entry = await page.readPageEntry(entryKey.entryKey);
                return entry;
            };
        };

    };

    public shared(msg) func updatePageEntry(entryKey : ?EntryKey, entry : ?PageEntry) : async Result.Result<(), Error> {

        //Reject Anonymous User
        //if(Principal.toText(msg.caller) == "2vxsx-fae"){
        //    return #err(#NotAuthorized);
        //};

        let callerId = msg.caller;
        let result = Trie.find(
            profiles,
            key(callerId),
            Principal.equal
        );

        switch(result){
            case null{
                #err(#NotAuthorized);
            };
            case(?result){
                switch(entryKey){
                    case null{
                        switch(entry){
                            case null{
                                #err(#NoInputGiven)
                            };
                            case(?entryValue){
                                let page = await Page.Page(callerId);
                                let status = await page.createEntry(entryValue);
                                return status;
                            };
                        };
                    };
                    case (? entryKeyValue){
                        switch(entry){
                            case null {
                                let page = await Page.Page(callerId);
                                let pageStatus = await page.deletePageEntry(entryKeyValue.entryKey);
                                return pageStatus;
                            };
                            case (?entryValue){
                                let page = await Page.Page(callerId);
                                let entryStatus = await page.updatePageEntry(entryKeyValue.entryKey, entryValue);

                                return entryStatus;
                            };
                        };
                    };
                };
            };
        };

     
    };

    public shared(msg) func createPageEntryFile(fileId: Text, chunkId: Text, blobChunk: Blob): async Result.Result<(), Error>{
        let callerId = msg.caller;

        let page = await Page.Page(callerId);
        let status = await page.createFile(fileId,chunkId, blobChunk);
        return status;
    };

    //update profile
    public shared(msg) func updateProfile(profile: ProfileInput) : async Result.Result<(),Error> {
        
        //Reject Anonymous User
        //if(Principal.toText(msg.caller) == "2vxsx-fae"){
        //    return #err(#NotAuthorized)
        //};

        let callerId = msg.caller;

        let userProfile : Profile = {
            userName = profile.userName;
            id = callerId;
        };

        let result = Trie.find(
            profiles,       //Target Trie
            key(callerId), //Key
            Principal.equal       //Equality Checker
        );

        switch (result){
            //Preventing updates to profiles that haven't been created yet
            case null {
                #err(#NotFound);
            };
            case(? v) {
                profiles := Trie.replace(
                    profiles,       //Target trie
                    key(callerId), //Key
                    Principal.equal,      //Equality Checker
                    ?userProfile        //The profile that you mean to use to overWrite the existing profile
                ).0;                // The result is a tuple where the 0th entry is the resulting profiles trie
                #ok(());
            };
        };
    };

    //delete profile
    public shared(msg) func delete() : async Result.Result<(), Error> {
        
        let callerId = msg.caller;
        //Reject Anonymous User
        //if(Principal.toText(callerId) == "2vxsx-fae"){
        //    return #err(#NotAuthorized)
        //};

        let result = Trie.find(
            profiles,       //Target Trie
            key(callerId), //Key
            Principal.equal       //Equality Checker
        );

        switch (result){
            //Preventing updates to profiles that haven't been created yet
            case null {
                #err(#NotFound);
            };
            case(? v) {
                profiles := Trie.replace(
                    profiles,       //Target trie
                    key(callerId), //Key
                    Principal.equal,      //Equality Checker
                    null            //The profile that you mean to use to overWrite the existing profile
                ).0;                // The result is a tuple where the 0th entry is the resulting profiles trie
                #ok(());
            };
        };
    };

    private  func key(x: Principal) : Trie.Key<Principal> {
        return {key = x; hash = Principal.hash(x)};
    };
}