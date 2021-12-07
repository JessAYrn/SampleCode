export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Trie = IDL.Rec();
  const ProfileInput = IDL.Record({ 'userName' : IDL.Text });
  const AmountAccepted = IDL.Record({ 'accepted' : IDL.Nat64 });
  const Error = IDL.Variant({
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
    'NoInputGiven' : IDL.Null,
  });
  const Result_3 = IDL.Variant({ 'ok' : AmountAccepted, 'err' : Error });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const EntryKey = IDL.Record({ 'entryKey' : IDL.Nat });
  const PageEntry = IDL.Record({
    'date' : IDL.Int,
    'text' : IDL.Text,
    'timeTillUnlock' : IDL.Int,
    'lockTime' : IDL.Int,
    'location' : IDL.Text,
    'entryTitle' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : PageEntry, 'err' : Error });
  const Branch = IDL.Record({
    'left' : Trie,
    'size' : IDL.Nat,
    'right' : Trie,
  });
  const Hash = IDL.Nat32;
  const Key = IDL.Record({ 'key' : IDL.Nat, 'hash' : Hash });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Key, PageEntry), List)));
  const AssocList = IDL.Opt(IDL.Tuple(IDL.Tuple(Key, PageEntry), List));
  const Leaf = IDL.Record({ 'size' : IDL.Nat, 'keyvals' : AssocList });
  Trie.fill(
    IDL.Variant({ 'branch' : Branch, 'leaf' : Leaf, 'empty' : IDL.Null })
  );
  const Bio = IDL.Record({
    'dob' : IDL.Text,
    'name' : IDL.Text,
    'biography' : IDL.Text,
    'birthPlace' : IDL.Text,
    'siblings' : IDL.Text,
    'children' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Tuple(Trie, Bio), 'err' : Error });
  const User = IDL.Service({
    'create' : IDL.Func([ProfileInput], [Result_3], []),
    'createPageEntryFile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8)],
        [Result],
        [],
      ),
    'delete' : IDL.Func([], [Result], []),
    'readEntry' : IDL.Func([EntryKey], [Result_2], []),
    'readPage' : IDL.Func([], [Result_1], []),
    'updatePageEntry' : IDL.Func(
        [IDL.Opt(EntryKey), IDL.Opt(PageEntry)],
        [Result],
        [],
      ),
    'updateProfile' : IDL.Func([ProfileInput], [Result], []),
  });
  return User;
};
export const init = ({ IDL }) => { return []; };
