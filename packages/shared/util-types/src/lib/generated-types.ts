export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Money: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type GetProductsQuery = { 
  readonly __typename?: 'Query', 
  readonly products: { 
    readonly __typename?: 'ProductList', 
    readonly totalItems: number, 
    readonly items: ReadonlyArray<{ 
      readonly __typename?: 'Product', 
      readonly id: string, 
      readonly name: string, 
      readonly slug: string, 
      readonly description: string, 
      readonly featuredAsset: { 
        readonly __typename?: 'Asset', 
        readonly id: string, 
        readonly preview: string 
      } | null, 
      readonly variants: ReadonlyArray<{ 
        readonly __typename?: 'ProductVariant', 
        readonly id: string, 
        readonly name: string, 
        readonly price: any, 
        readonly currencyCode: CurrencyCode, 
        readonly priceWithTax: any, 
        readonly sku: string 
      }> 
    }> 
  } 
};

export type GetProductQuery = { 
  readonly __typename?: 'Query', 
  readonly product: { 
    readonly __typename?: 'Product', 
    readonly id: string, 
    readonly name: string, 
    readonly slug: string, 
    readonly description: string, 
    readonly featuredAsset: { 
      readonly __typename?: 'Asset', 
      readonly id: string, 
      readonly preview: string 
    } | null, 
    readonly variants: ReadonlyArray<{ 
      readonly __typename?: 'ProductVariant', 
      readonly id: string, 
      readonly name: string, 
      readonly price: any, 
      readonly currencyCode: CurrencyCode, 
      readonly priceWithTax: any, 
      readonly sku: string, 
      readonly stockLevel: string 
    }> 
  } | null 
};

export type ProductListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<ProductFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<ProductSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

export enum CurrencyCode {
  /** United States dollar */
  Usd = 'USD',
  /** Euro */
  Eur = 'EUR',
  /** British pound */
  Gbp = 'GBP'
}

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type ProductFilterParameter = {
  readonly createdAt: InputMaybe<DateOperators>;
  readonly description: InputMaybe<StringOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly languageCode: InputMaybe<StringOperators>;
  readonly name: InputMaybe<StringOperators>;
  readonly slug: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type ProductSortParameter = {
  readonly createdAt: InputMaybe<SortOrder>;
  readonly description: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly slug: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

export type DateOperators = {
  readonly after: InputMaybe<Scalars['DateTime']['input']>;
  readonly before: InputMaybe<Scalars['DateTime']['input']>;
  readonly between: InputMaybe<DateRange>;
  readonly eq: InputMaybe<Scalars['DateTime']['input']>;
  readonly isNull: InputMaybe<Scalars['Boolean']['input']>;
};

export type StringOperators = {
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly isNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly notContains: InputMaybe<Scalars['String']['input']>;
  readonly notEq: InputMaybe<Scalars['String']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly regex: InputMaybe<Scalars['String']['input']>;
};

export type IdOperators = {
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly notEq: InputMaybe<Scalars['String']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

export type DateRange = {
  readonly end: Scalars['DateTime']['input'];
  readonly start: Scalars['DateTime']['input'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
} 