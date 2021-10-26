import type { Principal } from '@dfinity/principal';
export type AssocList = [] | [[[Key, JournalEntry], List]];
export interface Branch { 'left' : Trie, 'size' : bigint, 'right' : Trie }
export interface EntryKey { 'entryKey' : bigint }
export type Error = { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'AlreadyExists' : null } |
  { 'NoInputGiven' : null };
export type Hash = number;
export interface JournalEntry {
  'date' : string,
  'text' : string,
  'location' : string,
}
export interface Key { 'key' : bigint, 'hash' : Hash }
export interface Leaf { 'size' : bigint, 'keyvals' : AssocList }
export type List = [] | [[[Key, JournalEntry], List]];
export interface ProfileInput { 'userName' : string }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Trie } |
  { 'err' : Error };
export type Result_2 = { 'ok' : JournalEntry } |
  { 'err' : Error };
export type Trie = { 'branch' : Branch } |
  { 'leaf' : Leaf } |
  { 'empty' : null };
export interface User {
  'create' : (arg_0: ProfileInput) => Promise<Result>,
  'delete' : () => Promise<Result>,
  'readEntry' : (arg_0: EntryKey) => Promise<Result_2>,
  'readJournal' : () => Promise<Result_1>,
  'updateJournal' : (
      arg_0: [] | [EntryKey],
      arg_1: [] | [JournalEntry],
    ) => Promise<Result>,
  'updateProfile' : (arg_0: ProfileInput) => Promise<Result>,
}
export interface _SERVICE extends User {}
