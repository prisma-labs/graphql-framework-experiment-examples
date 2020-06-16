import {FieldsSelection,Observable} from 'genql-runtime'

export interface Query{users:(User[]|null),__typename:'Query'}


/** foobar */
export interface User{id:(ID|null),name:(String|null),__typename:'User'}


/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID=string


/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String=string


/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean=boolean

export interface QueryRequest{users?:UserRequest,__typename?:boolean|number,__scalar?:boolean|number}


/** foobar */
export interface UserRequest{id?:boolean|number,name?:boolean|number,__typename?:boolean|number,__scalar?:boolean|number}


  const Query_possibleTypes = ['Query']
  export const isQuery = (obj: { __typename: String }): obj is Query => {
    if (!obj.__typename) throw new Error('__typename is missing')
    return Query_possibleTypes.includes(obj.__typename)
  }



  const User_possibleTypes = ['User']
  export const isUser = (obj: { __typename: String }): obj is User => {
    if (!obj.__typename) throw new Error('__typename is missing')
    return User_possibleTypes.includes(obj.__typename)
  }


export interface QueryPromiseChain{users:({get:<R extends UserRequest>(request: R, defaultValue?:(User[]|null))=>Promise<(User[]|null)>})}

export interface QueryObservableChain{users:({get:<R extends UserRequest>(request: R, defaultValue?:(User[]|null))=>Observable<(User[]|null)>})}


/** foobar */
export interface UserPromiseChain{id:({get:(request?:boolean|number,defaultValue?:(ID|null))=>Promise<(ID|null)>}),name:({get:(request?:boolean|number,defaultValue?:(String|null))=>Promise<(String|null)>})}


/** foobar */
export interface UserObservableChain{id:({get:(request?:boolean|number,defaultValue?:(ID|null))=>Observable<(ID|null)>}),name:({get:(request?:boolean|number,defaultValue?:(String|null))=>Observable<(String|null)>})}