/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResultSet
// ====================================================

export interface GetResultSet_resultSet_photos {
  __typename: "Photo";
  id: string;
  secret: string;
  server: number;
  farm: number;
  title: string;
  owner: string;
}

export interface GetResultSet_resultSet {
  __typename: "ResultSet";
  photos: (GetResultSet_resultSet_photos | null)[];
}

export interface GetResultSet {
  resultSet: GetResultSet_resultSet | null;
}

export interface GetResultSetVariables {
  searchText?: string | null;
}
