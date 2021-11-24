import type { Principal } from '@dfinity/principal';
export interface AmountAccepted { 'accepted' : bigint }
export type AssocList = [] | [[[Key, JournalEntry], List]];
export interface Bio {
  'dob' : string,
  'name' : string,
  'biography' : string,
  'birthPlace' : string,
  'siblings' : string,
  'children' : string,
}
export interface Branch { 'left' : Trie, 'size' : bigint, 'right' : Trie }
export interface EntryKey { 'entryKey' : bigint }
export type Error = { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'AlreadyExists' : null } |
  { 'NoInputGiven' : null };
export type Hash = number;
export interface JournalEntry {
  'date' : bigint,
  'text' : string,
  'timeTillUnlock' : bigint,
  'lockTime' : bigint,
  'location' : string,
  'entryTitle' : string,
}
export interface JournalFile {
  'file1' : [] | [Array<number>],
  'file2' : [] | [Array<number>],
}
export interface Key { 'key' : bigint, 'hash' : Hash }
export interface Leaf { 'size' : bigint, 'keyvals' : AssocList }
export type List = [] | [[[Key, JournalEntry], List]];
export interface ProfileInput { 'userName' : string }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : [Trie, Bio] } |
  { 'err' : Error };
export type Result_2 = { 'ok' : [JournalEntry, JournalFile] } |
  { 'err' : Error };
export type Result_3 = { 'ok' : AmountAccepted } |
  { 'err' : Error };
export type Trie = { 'branch' : Branch } |
  { 'leaf' : Leaf } |
  { 'empty' : null };
export interface User {
  'create' : (arg_0: ProfileInput) => Promise<Result_3>,
  'delete' : () => Promise<Result>,
  'readEntry' : (arg_0: EntryKey) => Promise<Result_2>,
  'readJournal' : () => Promise<Result_1>,
  'updateJournal' : (
      arg_0: [] | [EntryKey],
      arg_1: [] | [[JournalEntry, JournalFile]],
    ) => Promise<Result>,
  'updateProfile' : (arg_0: ProfileInput) => Promise<Result>,
}
export interface _SERVICE extends User {}
