export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Trie = IDL.Rec();
  const ProfileInput = IDL.Record({ 'userName' : IDL.Text });
  const Error = IDL.Variant({
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
    'NoInputGiven' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const EntryKey = IDL.Record({ 'entryKey' : IDL.Nat });
  const JournalEntry = IDL.Record({
    'date' : IDL.Text,
    'text' : IDL.Text,
    'location' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : JournalEntry, 'err' : Error });
  const Branch = IDL.Record({
    'left' : Trie,
    'size' : IDL.Nat,
    'right' : Trie,
  });
  const Hash = IDL.Nat32;
  const Key = IDL.Record({ 'key' : IDL.Nat, 'hash' : Hash });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Key, JournalEntry), List)));
  const AssocList = IDL.Opt(IDL.Tuple(IDL.Tuple(Key, JournalEntry), List));
  const Leaf = IDL.Record({ 'size' : IDL.Nat, 'keyvals' : AssocList });
  Trie.fill(
    IDL.Variant({ 'branch' : Branch, 'leaf' : Leaf, 'empty' : IDL.Null })
  );
  const Result_1 = IDL.Variant({ 'ok' : Trie, 'err' : Error });
  const User = IDL.Service({
    'create' : IDL.Func([ProfileInput], [Result], []),
    'delete' : IDL.Func([], [Result], []),
    'readEntry' : IDL.Func([EntryKey], [Result_2], []),
    'readJournal' : IDL.Func([], [Result_1], []),
    'updateJournal' : IDL.Func(
        [IDL.Opt(EntryKey), IDL.Opt(JournalEntry)],
        [Result],
        [],
      ),
    'updateProfile' : IDL.Func([ProfileInput], [Result], []),
  });
  return User;
};
export const init = ({ IDL }) => { return []; };
