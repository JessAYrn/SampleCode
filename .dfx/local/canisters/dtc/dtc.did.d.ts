import type { Principal } from '@dfinity/principal';
export interface AmountAccepted { 'accepted' : bigint }
export type AssocList = [] | [[[Key, PageEntry], List]];
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
export interface Key { 'key' : bigint, 'hash' : Hash }
export interface Leaf { 'size' : bigint, 'keyvals' : AssocList }
export type List = [] | [[[Key, PageEntry], List]];
export interface PageEntry {
  'date' : bigint,
  'text' : string,
  'timeTillUnlock' : bigint,
  'lockTime' : bigint,
  'location' : string,
  'entryTitle' : string,
}
export interface ProfileInput { 'userName' : string }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : [Trie, Bio] } |
  { 'err' : Error };
export type Result_2 = { 'ok' : PageEntry } |
  { 'err' : Error };
export type Result_3 = { 'ok' : AmountAccepted } |
  { 'err' : Error };
export type Trie = { 'branch' : Branch } |
  { 'leaf' : Leaf } |
  { 'empty' : null };
export interface User {
  'create' : (arg_0: ProfileInput) => Promise<Result_3>,
  'createPageEntryFile' : (
      arg_0: string,
      arg_1: string,
      arg_2: Array<number>,
    ) => Promise<Result>,
  'delete' : () => Promise<Result>,
  'readEntry' : (arg_0: EntryKey) => Promise<Result_2>,
  'readPage' : () => Promise<Result_1>,
  'updatePageEntry' : (
      arg_0: [] | [EntryKey],
      arg_1: [] | [PageEntry],
    ) => Promise<Result>,
  'updateProfile' : (arg_0: ProfileInput) => Promise<Result>,
}
export interface _SERVICE extends User {}
