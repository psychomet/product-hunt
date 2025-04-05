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

export type ActiveOrderResult = NoActiveOrderError | Order;

export type AddPaymentToOrderResult = IneligiblePaymentMethodError | NoActiveOrderError | Order | OrderPaymentStateError | OrderStateTransitionError | PaymentDeclinedError | PaymentFailedError;

export type Address = Node & {
  readonly __typename?: 'Address';
  readonly city: Maybe<Scalars['String']['output']>;
  readonly company: Maybe<Scalars['String']['output']>;
  readonly country: Country;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly defaultBillingAddress: Maybe<Scalars['Boolean']['output']>;
  readonly defaultShippingAddress: Maybe<Scalars['Boolean']['output']>;
  readonly fullName: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly phoneNumber: Maybe<Scalars['String']['output']>;
  readonly postalCode: Maybe<Scalars['String']['output']>;
  readonly province: Maybe<Scalars['String']['output']>;
  readonly streetLine1: Scalars['String']['output'];
  readonly streetLine2: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type Adjustment = {
  readonly __typename?: 'Adjustment';
  readonly adjustmentSource: Scalars['String']['output'];
  readonly amount: Scalars['Money']['output'];
  readonly data: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly type: AdjustmentType;
};

export enum AdjustmentType {
  DistributedOrderPromotion = 'DISTRIBUTED_ORDER_PROMOTION',
  Other = 'OTHER',
  Promotion = 'PROMOTION'
}

/** Returned when attempting to set the Customer for an Order when already logged in. */
export type AlreadyLoggedInError = ErrorResult & {
  readonly __typename?: 'AlreadyLoggedInError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export type ApplyCouponCodeResult = CouponCodeExpiredError | CouponCodeInvalidError | CouponCodeLimitError | Order;

export type Asset = Node & {
  readonly __typename?: 'Asset';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly fileSize: Scalars['Int']['output'];
  readonly focalPoint: Maybe<Coordinate>;
  readonly height: Scalars['Int']['output'];
  readonly id: Scalars['ID']['output'];
  readonly mimeType: Scalars['String']['output'];
  readonly name: Scalars['String']['output'];
  readonly preview: Scalars['String']['output'];
  readonly source: Scalars['String']['output'];
  readonly tags: ReadonlyArray<Tag>;
  readonly type: AssetType;
  readonly updatedAt: Scalars['DateTime']['output'];
  readonly width: Scalars['Int']['output'];
};

export type AssetList = PaginatedList & {
  readonly __typename?: 'AssetList';
  readonly items: ReadonlyArray<Asset>;
  readonly totalItems: Scalars['Int']['output'];
};

export enum AssetType {
  Binary = 'BINARY',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type AuthenticationInput = {
  readonly native: InputMaybe<NativeAuthInput>;
};

export type AuthenticationMethod = Node & {
  readonly __typename?: 'AuthenticationMethod';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly strategy: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type AuthenticationResult = CurrentUser | InvalidCredentialsError | NotVerifiedError;

export type BooleanCustomFieldConfig = CustomField & {
  readonly __typename?: 'BooleanCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

/** Operators for filtering on a list of Boolean fields */
export type BooleanListOperators = {
  readonly inList: Scalars['Boolean']['input'];
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  readonly eq: InputMaybe<Scalars['Boolean']['input']>;
  readonly isNull: InputMaybe<Scalars['Boolean']['input']>;
};

export type BooleanStructFieldConfig = StructField & {
  readonly __typename?: 'BooleanStructFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type Channel = Node & {
  readonly __typename?: 'Channel';
  readonly availableCurrencyCodes: ReadonlyArray<CurrencyCode>;
  readonly availableLanguageCodes: Maybe<ReadonlyArray<LanguageCode>>;
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  /** @deprecated Use defaultCurrencyCode instead */
  readonly currencyCode: CurrencyCode;
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly defaultCurrencyCode: CurrencyCode;
  readonly defaultLanguageCode: LanguageCode;
  readonly defaultShippingZone: Maybe<Zone>;
  readonly defaultTaxZone: Maybe<Zone>;
  readonly id: Scalars['ID']['output'];
  /** Not yet used - will be implemented in a future release. */
  readonly outOfStockThreshold: Maybe<Scalars['Int']['output']>;
  readonly pricesIncludeTax: Scalars['Boolean']['output'];
  readonly seller: Maybe<Seller>;
  readonly token: Scalars['String']['output'];
  /** Not yet used - will be implemented in a future release. */
  readonly trackInventory: Maybe<Scalars['Boolean']['output']>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type Collection = Node & {
  readonly __typename?: 'Collection';
  readonly assets: ReadonlyArray<Asset>;
  readonly breadcrumbs: ReadonlyArray<CollectionBreadcrumb>;
  readonly children: Maybe<ReadonlyArray<Collection>>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly featuredAsset: Maybe<Asset>;
  readonly filters: ReadonlyArray<ConfigurableOperation>;
  readonly id: Scalars['ID']['output'];
  readonly languageCode: Maybe<LanguageCode>;
  readonly name: Scalars['String']['output'];
  readonly parent: Maybe<Collection>;
  readonly parentId: Scalars['ID']['output'];
  readonly position: Scalars['Int']['output'];
  readonly productVariants: ProductVariantList;
  readonly slug: Scalars['String']['output'];
  readonly translations: ReadonlyArray<CollectionTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
};


export type CollectionProductVariantsArgs = {
  options: InputMaybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  readonly __typename?: 'CollectionBreadcrumb';
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly slug: Scalars['String']['output'];
};

export type CollectionFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<CollectionFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<CollectionFilterParameter>>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly description: InputMaybe<StringOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly languageCode: InputMaybe<StringOperators>;
  readonly name: InputMaybe<StringOperators>;
  readonly parentId: InputMaybe<IdOperators>;
  readonly position: InputMaybe<NumberOperators>;
  readonly slug: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type CollectionList = PaginatedList & {
  readonly __typename?: 'CollectionList';
  readonly items: ReadonlyArray<Collection>;
  readonly totalItems: Scalars['Int']['output'];
};

export type CollectionListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<CollectionFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<CollectionSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
  readonly topLevelOnly: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export type CollectionResult = {
  readonly __typename?: 'CollectionResult';
  readonly collection: Collection;
  readonly count: Scalars['Int']['output'];
};

export type CollectionSortParameter = {
  readonly createdAt: InputMaybe<SortOrder>;
  readonly description: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly parentId: InputMaybe<SortOrder>;
  readonly position: InputMaybe<SortOrder>;
  readonly slug: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

export type CollectionTranslation = {
  readonly __typename?: 'CollectionTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly slug: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ConfigArg = {
  readonly __typename?: 'ConfigArg';
  readonly name: Scalars['String']['output'];
  readonly value: Scalars['String']['output'];
};

export type ConfigArgDefinition = {
  readonly __typename?: 'ConfigArgDefinition';
  readonly defaultValue: Maybe<Scalars['JSON']['output']>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly required: Scalars['Boolean']['output'];
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type ConfigArgInput = {
  readonly name: Scalars['String']['input'];
  /** A JSON stringified representation of the actual value */
  readonly value: Scalars['String']['input'];
};

export type ConfigurableOperation = {
  readonly __typename?: 'ConfigurableOperation';
  readonly args: ReadonlyArray<ConfigArg>;
  readonly code: Scalars['String']['output'];
};

export type ConfigurableOperationDefinition = {
  readonly __typename?: 'ConfigurableOperationDefinition';
  readonly args: ReadonlyArray<ConfigArgDefinition>;
  readonly code: Scalars['String']['output'];
  readonly description: Scalars['String']['output'];
};

export type ConfigurableOperationInput = {
  readonly arguments: ReadonlyArray<ConfigArgInput>;
  readonly code: Scalars['String']['input'];
};

export type Coordinate = {
  readonly __typename?: 'Coordinate';
  readonly x: Scalars['Float']['output'];
  readonly y: Scalars['Float']['output'];
};

/**
 * A Country of the world which your shop operates in.
 *
 * The `code` field is typically a 2-character ISO code such as "GB", "US", "DE" etc. This code is used in certain inputs such as
 * `UpdateAddressInput` and `CreateAddressInput` to specify the country.
 */
export type Country = Node & Region & {
  readonly __typename?: 'Country';
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly enabled: Scalars['Boolean']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly parent: Maybe<Region>;
  readonly parentId: Maybe<Scalars['ID']['output']>;
  readonly translations: ReadonlyArray<RegionTranslation>;
  readonly type: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type CountryList = PaginatedList & {
  readonly __typename?: 'CountryList';
  readonly items: ReadonlyArray<Country>;
  readonly totalItems: Scalars['Int']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeExpiredError = ErrorResult & {
  readonly __typename?: 'CouponCodeExpiredError';
  readonly couponCode: Scalars['String']['output'];
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeInvalidError = ErrorResult & {
  readonly __typename?: 'CouponCodeInvalidError';
  readonly couponCode: Scalars['String']['output'];
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeLimitError = ErrorResult & {
  readonly __typename?: 'CouponCodeLimitError';
  readonly couponCode: Scalars['String']['output'];
  readonly errorCode: ErrorCode;
  readonly limit: Scalars['Int']['output'];
  readonly message: Scalars['String']['output'];
};

/**
 * Input used to create an Address.
 *
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export type CreateAddressInput = {
  readonly city: InputMaybe<Scalars['String']['input']>;
  readonly company: InputMaybe<Scalars['String']['input']>;
  readonly countryCode: Scalars['String']['input'];
  readonly customFields: InputMaybe<Scalars['JSON']['input']>;
  readonly defaultBillingAddress: InputMaybe<Scalars['Boolean']['input']>;
  readonly defaultShippingAddress: InputMaybe<Scalars['Boolean']['input']>;
  readonly fullName: InputMaybe<Scalars['String']['input']>;
  readonly phoneNumber: InputMaybe<Scalars['String']['input']>;
  readonly postalCode: InputMaybe<Scalars['String']['input']>;
  readonly province: InputMaybe<Scalars['String']['input']>;
  readonly streetLine1: Scalars['String']['input'];
  readonly streetLine2: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerInput = {
  readonly customFields: InputMaybe<Scalars['JSON']['input']>;
  readonly emailAddress: Scalars['String']['input'];
  readonly firstName: Scalars['String']['input'];
  readonly lastName: Scalars['String']['input'];
  readonly phoneNumber: InputMaybe<Scalars['String']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  Aed = 'AED',
  /** Afghan afghani */
  Afn = 'AFN',
  /** Albanian lek */
  All = 'ALL',
  /** Armenian dram */
  Amd = 'AMD',
  /** Netherlands Antillean guilder */
  Ang = 'ANG',
  /** Angolan kwanza */
  Aoa = 'AOA',
  /** Argentine peso */
  Ars = 'ARS',
  /** Australian dollar */
  Aud = 'AUD',
  /** Aruban florin */
  Awg = 'AWG',
  /** Azerbaijani manat */
  Azn = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  Bam = 'BAM',
  /** Barbados dollar */
  Bbd = 'BBD',
  /** Bangladeshi taka */
  Bdt = 'BDT',
  /** Bulgarian lev */
  Bgn = 'BGN',
  /** Bahraini dinar */
  Bhd = 'BHD',
  /** Burundian franc */
  Bif = 'BIF',
  /** Bermudian dollar */
  Bmd = 'BMD',
  /** Brunei dollar */
  Bnd = 'BND',
  /** Boliviano */
  Bob = 'BOB',
  /** Brazilian real */
  Brl = 'BRL',
  /** Bahamian dollar */
  Bsd = 'BSD',
  /** Bhutanese ngultrum */
  Btn = 'BTN',
  /** Botswana pula */
  Bwp = 'BWP',
  /** Belarusian ruble */
  Byn = 'BYN',
  /** Belize dollar */
  Bzd = 'BZD',
  /** Canadian dollar */
  Cad = 'CAD',
  /** Congolese franc */
  Cdf = 'CDF',
  /** Swiss franc */
  Chf = 'CHF',
  /** Chilean peso */
  Clp = 'CLP',
  /** Renminbi (Chinese) yuan */
  Cny = 'CNY',
  /** Colombian peso */
  Cop = 'COP',
  /** Costa Rican colon */
  Crc = 'CRC',
  /** Cuban convertible peso */
  Cuc = 'CUC',
  /** Cuban peso */
  Cup = 'CUP',
  /** Cape Verde escudo */
  Cve = 'CVE',
  /** Czech koruna */
  Czk = 'CZK',
  /** Djiboutian franc */
  Djf = 'DJF',
  /** Danish krone */
  Dkk = 'DKK',
  /** Dominican peso */
  Dop = 'DOP',
  /** Algerian dinar */
  Dzd = 'DZD',
  /** Egyptian pound */
  Egp = 'EGP',
  /** Eritrean nakfa */
  Ern = 'ERN',
  /** Ethiopian birr */
  Etb = 'ETB',
  /** Euro */
  Eur = 'EUR',
  /** Fiji dollar */
  Fjd = 'FJD',
  /** Falkland Islands pound */
  Fkp = 'FKP',
  /** Pound sterling */
  Gbp = 'GBP',
  /** Georgian lari */
  Gel = 'GEL',
  /** Ghanaian cedi */
  Ghs = 'GHS',
  /** Gibraltar pound */
  Gip = 'GIP',
  /** Gambian dalasi */
  Gmd = 'GMD',
  /** Guinean franc */
  Gnf = 'GNF',
  /** Guatemalan quetzal */
  Gtq = 'GTQ',
  /** Guyanese dollar */
  Gyd = 'GYD',
  /** Hong Kong dollar */
  Hkd = 'HKD',
  /** Honduran lempira */
  Hnl = 'HNL',
  /** Croatian kuna */
  Hrk = 'HRK',
  /** Haitian gourde */
  Htg = 'HTG',
  /** Hungarian forint */
  Huf = 'HUF',
  /** Indonesian rupiah */
  Idr = 'IDR',
  /** Israeli new shekel */
  Ils = 'ILS',
  /** Indian rupee */
  Inr = 'INR',
  /** Iraqi dinar */
  Iqd = 'IQD',
  /** Iranian rial */
  Irr = 'IRR',
  /** Icelandic króna */
  Isk = 'ISK',
  /** Jamaican dollar */
  Jmd = 'JMD',
  /** Jordanian dinar */
  Jod = 'JOD',
  /** Japanese yen */
  Jpy = 'JPY',
  /** Kenyan shilling */
  Kes = 'KES',
  /** Kyrgyzstani som */
  Kgs = 'KGS',
  /** Cambodian riel */
  Khr = 'KHR',
  /** Comoro franc */
  Kmf = 'KMF',
  /** North Korean won */
  Kpw = 'KPW',
  /** South Korean won */
  Krw = 'KRW',
  /** Kuwaiti dinar */
  Kwd = 'KWD',
  /** Cayman Islands dollar */
  Kyd = 'KYD',
  /** Kazakhstani tenge */
  Kzt = 'KZT',
  /** Lao kip */
  Lak = 'LAK',
  /** Lebanese pound */
  Lbp = 'LBP',
  /** Sri Lankan rupee */
  Lkr = 'LKR',
  /** Liberian dollar */
  Lrd = 'LRD',
  /** Lesotho loti */
  Lsl = 'LSL',
  /** Libyan dinar */
  Lyd = 'LYD',
  /** Moroccan dirham */
  Mad = 'MAD',
  /** Moldovan leu */
  Mdl = 'MDL',
  /** Malagasy ariary */
  Mga = 'MGA',
  /** Macedonian denar */
  Mkd = 'MKD',
  /** Myanmar kyat */
  Mmk = 'MMK',
  /** Mongolian tögrög */
  Mnt = 'MNT',
  /** Macanese pataca */
  Mop = 'MOP',
  /** Mauritanian ouguiya */
  Mru = 'MRU',
  /** Mauritian rupee */
  Mur = 'MUR',
  /** Maldivian rufiyaa */
  Mvr = 'MVR',
  /** Malawian kwacha */
  Mwk = 'MWK',
  /** Mexican peso */
  Mxn = 'MXN',
  /** Malaysian ringgit */
  Myr = 'MYR',
  /** Mozambican metical */
  Mzn = 'MZN',
  /** Namibian dollar */
  Nad = 'NAD',
  /** Nigerian naira */
  Ngn = 'NGN',
  /** Nicaraguan córdoba */
  Nio = 'NIO',
  /** Norwegian krone */
  Nok = 'NOK',
  /** Nepalese rupee */
  Npr = 'NPR',
  /** New Zealand dollar */
  Nzd = 'NZD',
  /** Omani rial */
  Omr = 'OMR',
  /** Panamanian balboa */
  Pab = 'PAB',
  /** Peruvian sol */
  Pen = 'PEN',
  /** Papua New Guinean kina */
  Pgk = 'PGK',
  /** Philippine peso */
  Php = 'PHP',
  /** Pakistani rupee */
  Pkr = 'PKR',
  /** Polish złoty */
  Pln = 'PLN',
  /** Paraguayan guaraní */
  Pyg = 'PYG',
  /** Qatari riyal */
  Qar = 'QAR',
  /** Romanian leu */
  Ron = 'RON',
  /** Serbian dinar */
  Rsd = 'RSD',
  /** Russian ruble */
  Rub = 'RUB',
  /** Rwandan franc */
  Rwf = 'RWF',
  /** Saudi riyal */
  Sar = 'SAR',
  /** Solomon Islands dollar */
  Sbd = 'SBD',
  /** Seychelles rupee */
  Scr = 'SCR',
  /** Sudanese pound */
  Sdg = 'SDG',
  /** Swedish krona/kronor */
  Sek = 'SEK',
  /** Singapore dollar */
  Sgd = 'SGD',
  /** Saint Helena pound */
  Shp = 'SHP',
  /** Sierra Leonean leone */
  Sll = 'SLL',
  /** Somali shilling */
  Sos = 'SOS',
  /** Surinamese dollar */
  Srd = 'SRD',
  /** South Sudanese pound */
  Ssp = 'SSP',
  /** São Tomé and Príncipe dobra */
  Stn = 'STN',
  /** Salvadoran colón */
  Svc = 'SVC',
  /** Syrian pound */
  Syp = 'SYP',
  /** Swazi lilangeni */
  Szl = 'SZL',
  /** Thai baht */
  Thb = 'THB',
  /** Tajikistani somoni */
  Tjs = 'TJS',
  /** Turkmenistan manat */
  Tmt = 'TMT',
  /** Tunisian dinar */
  Tnd = 'TND',
  /** Tongan paʻanga */
  Top = 'TOP',
  /** Turkish lira */
  Try = 'TRY',
  /** Trinidad and Tobago dollar */
  Ttd = 'TTD',
  /** New Taiwan dollar */
  Twd = 'TWD',
  /** Tanzanian shilling */
  Tzs = 'TZS',
  /** Ukrainian hryvnia */
  Uah = 'UAH',
  /** Ugandan shilling */
  Ugx = 'UGX',
  /** United States dollar */
  Usd = 'USD',
  /** Uruguayan peso */
  Uyu = 'UYU',
  /** Uzbekistan som */
  Uzs = 'UZS',
  /** Venezuelan bolívar soberano */
  Ves = 'VES',
  /** Vietnamese đồng */
  Vnd = 'VND',
  /** Vanuatu vatu */
  Vuv = 'VUV',
  /** Samoan tala */
  Wst = 'WST',
  /** CFA franc BEAC */
  Xaf = 'XAF',
  /** East Caribbean dollar */
  Xcd = 'XCD',
  /** CFA franc BCEAO */
  Xof = 'XOF',
  /** CFP franc (franc Pacifique) */
  Xpf = 'XPF',
  /** Yemeni rial */
  Yer = 'YER',
  /** South African rand */
  Zar = 'ZAR',
  /** Zambian kwacha */
  Zmw = 'ZMW',
  /** Zimbabwean dollar */
  Zwl = 'ZWL'
}

export type CurrentUser = {
  readonly __typename?: 'CurrentUser';
  readonly channels: ReadonlyArray<CurrentUserChannel>;
  readonly id: Scalars['ID']['output'];
  readonly identifier: Scalars['String']['output'];
};

export type CurrentUserChannel = {
  readonly __typename?: 'CurrentUserChannel';
  readonly code: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly permissions: ReadonlyArray<Permission>;
  readonly token: Scalars['String']['output'];
};

export type CustomField = {
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type CustomFieldConfig = BooleanCustomFieldConfig | DateTimeCustomFieldConfig | FloatCustomFieldConfig | IntCustomFieldConfig | LocaleStringCustomFieldConfig | LocaleTextCustomFieldConfig | RelationCustomFieldConfig | StringCustomFieldConfig | StructCustomFieldConfig | TextCustomFieldConfig;

export type Customer = Node & {
  readonly __typename?: 'Customer';
  readonly addresses: Maybe<ReadonlyArray<Address>>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly emailAddress: Scalars['String']['output'];
  readonly firstName: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly lastName: Scalars['String']['output'];
  readonly orders: OrderList;
  readonly phoneNumber: Maybe<Scalars['String']['output']>;
  readonly title: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Scalars['DateTime']['output'];
  readonly user: Maybe<User>;
};


export type CustomerOrdersArgs = {
  options: InputMaybe<OrderListOptions>;
};

export type CustomerFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<CustomerFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<CustomerFilterParameter>>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly emailAddress: InputMaybe<StringOperators>;
  readonly firstName: InputMaybe<StringOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly lastName: InputMaybe<StringOperators>;
  readonly phoneNumber: InputMaybe<StringOperators>;
  readonly title: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type CustomerGroup = Node & {
  readonly __typename?: 'CustomerGroup';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly customers: CustomerList;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};


export type CustomerGroupCustomersArgs = {
  options: InputMaybe<CustomerListOptions>;
};

export type CustomerList = PaginatedList & {
  readonly __typename?: 'CustomerList';
  readonly items: ReadonlyArray<Customer>;
  readonly totalItems: Scalars['Int']['output'];
};

export type CustomerListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<CustomerFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<CustomerSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

export type CustomerSortParameter = {
  readonly createdAt: InputMaybe<SortOrder>;
  readonly emailAddress: InputMaybe<SortOrder>;
  readonly firstName: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly lastName: InputMaybe<SortOrder>;
  readonly phoneNumber: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

/** Operators for filtering on a list of Date fields */
export type DateListOperators = {
  readonly inList: Scalars['DateTime']['input'];
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  readonly after: InputMaybe<Scalars['DateTime']['input']>;
  readonly before: InputMaybe<Scalars['DateTime']['input']>;
  readonly between: InputMaybe<DateRange>;
  readonly eq: InputMaybe<Scalars['DateTime']['input']>;
  readonly isNull: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateRange = {
  readonly end: Scalars['DateTime']['input'];
  readonly start: Scalars['DateTime']['input'];
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  readonly __typename?: 'DateTimeCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly max: Maybe<Scalars['String']['output']>;
  readonly min: Maybe<Scalars['String']['output']>;
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly step: Maybe<Scalars['Int']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeStructFieldConfig = StructField & {
  readonly __typename?: 'DateTimeStructFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly max: Maybe<Scalars['String']['output']>;
  readonly min: Maybe<Scalars['String']['output']>;
  readonly name: Scalars['String']['output'];
  readonly step: Maybe<Scalars['Int']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type DeletionResponse = {
  readonly __typename?: 'DeletionResponse';
  readonly message: Maybe<Scalars['String']['output']>;
  readonly result: DeletionResult;
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED'
}

export type Discount = {
  readonly __typename?: 'Discount';
  readonly adjustmentSource: Scalars['String']['output'];
  readonly amount: Scalars['Money']['output'];
  readonly amountWithTax: Scalars['Money']['output'];
  readonly description: Scalars['String']['output'];
  readonly type: AdjustmentType;
};

/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  readonly __typename?: 'EmailAddressConflictError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export enum ErrorCode {
  AlreadyLoggedInError = 'ALREADY_LOGGED_IN_ERROR',
  CouponCodeExpiredError = 'COUPON_CODE_EXPIRED_ERROR',
  CouponCodeInvalidError = 'COUPON_CODE_INVALID_ERROR',
  CouponCodeLimitError = 'COUPON_CODE_LIMIT_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  GuestCheckoutError = 'GUEST_CHECKOUT_ERROR',
  IdentifierChangeTokenExpiredError = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  IdentifierChangeTokenInvalidError = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  IneligiblePaymentMethodError = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  IneligibleShippingMethodError = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  InsufficientStockError = 'INSUFFICIENT_STOCK_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  MissingPasswordError = 'MISSING_PASSWORD_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  NegativeQuantityError = 'NEGATIVE_QUANTITY_ERROR',
  NotVerifiedError = 'NOT_VERIFIED_ERROR',
  NoActiveOrderError = 'NO_ACTIVE_ORDER_ERROR',
  OrderInterceptorError = 'ORDER_INTERCEPTOR_ERROR',
  OrderLimitError = 'ORDER_LIMIT_ERROR',
  OrderModificationError = 'ORDER_MODIFICATION_ERROR',
  OrderPaymentStateError = 'ORDER_PAYMENT_STATE_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  PasswordAlreadySetError = 'PASSWORD_ALREADY_SET_ERROR',
  PasswordResetTokenExpiredError = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  PasswordResetTokenInvalidError = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PasswordValidationError = 'PASSWORD_VALIDATION_ERROR',
  PaymentDeclinedError = 'PAYMENT_DECLINED_ERROR',
  PaymentFailedError = 'PAYMENT_FAILED_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
  VerificationTokenExpiredError = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  VerificationTokenInvalidError = 'VERIFICATION_TOKEN_INVALID_ERROR'
}

export type ErrorResult = {
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export type Facet = Node & {
  readonly __typename?: 'Facet';
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly translations: ReadonlyArray<FacetTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
  /** Returns a paginated, sortable, filterable list of the Facet's values. Added in v2.1.0. */
  readonly valueList: FacetValueList;
  readonly values: ReadonlyArray<FacetValue>;
};


export type FacetValueListArgs = {
  options: InputMaybe<FacetValueListOptions>;
};

export type FacetFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<FacetFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<FacetFilterParameter>>;
  readonly code: InputMaybe<StringOperators>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly languageCode: InputMaybe<StringOperators>;
  readonly name: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type FacetList = PaginatedList & {
  readonly __typename?: 'FacetList';
  readonly items: ReadonlyArray<Facet>;
  readonly totalItems: Scalars['Int']['output'];
};

export type FacetListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<FacetFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<FacetSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

export type FacetSortParameter = {
  readonly code: InputMaybe<SortOrder>;
  readonly createdAt: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

export type FacetTranslation = {
  readonly __typename?: 'FacetTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type FacetValue = Node & {
  readonly __typename?: 'FacetValue';
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly facet: Facet;
  readonly facetId: Scalars['ID']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly translations: ReadonlyArray<FacetValueTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  readonly and: InputMaybe<Scalars['ID']['input']>;
  readonly or: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
};

export type FacetValueFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<FacetValueFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<FacetValueFilterParameter>>;
  readonly code: InputMaybe<StringOperators>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly facetId: InputMaybe<IdOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly languageCode: InputMaybe<StringOperators>;
  readonly name: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type FacetValueList = PaginatedList & {
  readonly __typename?: 'FacetValueList';
  readonly items: ReadonlyArray<FacetValue>;
  readonly totalItems: Scalars['Int']['output'];
};

export type FacetValueListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<FacetValueFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<FacetValueSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  readonly __typename?: 'FacetValueResult';
  readonly count: Scalars['Int']['output'];
  readonly facetValue: FacetValue;
};

export type FacetValueSortParameter = {
  readonly code: InputMaybe<SortOrder>;
  readonly createdAt: InputMaybe<SortOrder>;
  readonly facetId: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

export type FacetValueTranslation = {
  readonly __typename?: 'FacetValueTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type FloatCustomFieldConfig = CustomField & {
  readonly __typename?: 'FloatCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly max: Maybe<Scalars['Float']['output']>;
  readonly min: Maybe<Scalars['Float']['output']>;
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly step: Maybe<Scalars['Float']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type FloatStructFieldConfig = StructField & {
  readonly __typename?: 'FloatStructFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly max: Maybe<Scalars['Float']['output']>;
  readonly min: Maybe<Scalars['Float']['output']>;
  readonly name: Scalars['String']['output'];
  readonly step: Maybe<Scalars['Float']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type Fulfillment = Node & {
  readonly __typename?: 'Fulfillment';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly lines: ReadonlyArray<FulfillmentLine>;
  readonly method: Scalars['String']['output'];
  readonly state: Scalars['String']['output'];
  /** @deprecated Use the `lines` field instead */
  readonly summary: ReadonlyArray<FulfillmentLine>;
  readonly trackingCode: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type FulfillmentLine = {
  readonly __typename?: 'FulfillmentLine';
  readonly fulfillment: Fulfillment;
  readonly fulfillmentId: Scalars['ID']['output'];
  readonly orderLine: OrderLine;
  readonly orderLineId: Scalars['ID']['output'];
  readonly quantity: Scalars['Int']['output'];
};

export enum GlobalFlag {
  False = 'FALSE',
  Inherit = 'INHERIT',
  True = 'TRUE'
}

/** Returned when attempting to set the Customer on a guest checkout when the configured GuestCheckoutStrategy does not allow it. */
export type GuestCheckoutError = ErrorResult & {
  readonly __typename?: 'GuestCheckoutError';
  readonly errorCode: ErrorCode;
  readonly errorDetail: Scalars['String']['output'];
  readonly message: Scalars['String']['output'];
};

export type HistoryEntry = Node & {
  readonly __typename?: 'HistoryEntry';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly data: Scalars['JSON']['output'];
  readonly id: Scalars['ID']['output'];
  readonly type: HistoryEntryType;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type HistoryEntryFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<HistoryEntryFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<HistoryEntryFilterParameter>>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly type: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type HistoryEntryList = PaginatedList & {
  readonly __typename?: 'HistoryEntryList';
  readonly items: ReadonlyArray<HistoryEntry>;
  readonly totalItems: Scalars['Int']['output'];
};

export type HistoryEntryListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<HistoryEntrySortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

export type HistoryEntrySortParameter = {
  readonly createdAt: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

export enum HistoryEntryType {
  CustomerAddedToGroup = 'CUSTOMER_ADDED_TO_GROUP',
  CustomerAddressCreated = 'CUSTOMER_ADDRESS_CREATED',
  CustomerAddressDeleted = 'CUSTOMER_ADDRESS_DELETED',
  CustomerAddressUpdated = 'CUSTOMER_ADDRESS_UPDATED',
  CustomerDetailUpdated = 'CUSTOMER_DETAIL_UPDATED',
  CustomerEmailUpdateRequested = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CustomerEmailUpdateVerified = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CustomerNote = 'CUSTOMER_NOTE',
  CustomerPasswordResetRequested = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CustomerPasswordResetVerified = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CustomerPasswordUpdated = 'CUSTOMER_PASSWORD_UPDATED',
  CustomerRegistered = 'CUSTOMER_REGISTERED',
  CustomerRemovedFromGroup = 'CUSTOMER_REMOVED_FROM_GROUP',
  CustomerVerified = 'CUSTOMER_VERIFIED',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED',
  OrderCustomerUpdated = 'ORDER_CUSTOMER_UPDATED',
  OrderFulfillment = 'ORDER_FULFILLMENT',
  OrderFulfillmentTransition = 'ORDER_FULFILLMENT_TRANSITION',
  OrderModified = 'ORDER_MODIFIED',
  OrderNote = 'ORDER_NOTE',
  OrderPaymentTransition = 'ORDER_PAYMENT_TRANSITION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderStateTransition = 'ORDER_STATE_TRANSITION'
}

/** Operators for filtering on a list of ID fields */
export type IdListOperators = {
  readonly inList: Scalars['ID']['input'];
};

/** Operators for filtering on an ID field */
export type IdOperators = {
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly isNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly notEq: InputMaybe<Scalars['String']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  readonly __typename?: 'IdentifierChangeTokenExpiredError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  readonly __typename?: 'IdentifierChangeTokenInvalidError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export type IneligiblePaymentMethodError = ErrorResult & {
  readonly __typename?: 'IneligiblePaymentMethodError';
  readonly eligibilityCheckerMessage: Maybe<Scalars['String']['output']>;
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export type IneligibleShippingMethodError = ErrorResult & {
  readonly __typename?: 'IneligibleShippingMethodError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  readonly __typename?: 'InsufficientStockError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
  readonly order: Order;
  readonly quantityAvailable: Scalars['Int']['output'];
};

export type IntCustomFieldConfig = CustomField & {
  readonly __typename?: 'IntCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly max: Maybe<Scalars['Int']['output']>;
  readonly min: Maybe<Scalars['Int']['output']>;
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly step: Maybe<Scalars['Int']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type IntStructFieldConfig = StructField & {
  readonly __typename?: 'IntStructFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly max: Maybe<Scalars['Int']['output']>;
  readonly min: Maybe<Scalars['Int']['output']>;
  readonly name: Scalars['String']['output'];
  readonly step: Maybe<Scalars['Int']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  readonly __typename?: 'InvalidCredentialsError';
  readonly authenticationError: Scalars['String']['output'];
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Belarusian */
  Be = 'be',
  /** Bulgarian */
  Bg = 'bg',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Tibetan */
  Bo = 'bo',
  /** Breton */
  Br = 'br',
  /** Bosnian */
  Bs = 'bs',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Corsican */
  Co = 'co',
  /** Czech */
  Cs = 'cs',
  /** Church Slavic */
  Cu = 'cu',
  /** Welsh */
  Cy = 'cy',
  /** Danish */
  Da = 'da',
  /** German */
  De = 'de',
  /** Austrian German */
  DeAt = 'de_AT',
  /** Swiss High German */
  DeCh = 'de_CH',
  /** Dzongkha */
  Dz = 'dz',
  /** Ewe */
  Ee = 'ee',
  /** Greek */
  El = 'el',
  /** English */
  En = 'en',
  /** Australian English */
  EnAu = 'en_AU',
  /** Canadian English */
  EnCa = 'en_CA',
  /** British English */
  EnGb = 'en_GB',
  /** American English */
  EnUs = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  EsEs = 'es_ES',
  /** Mexican Spanish */
  EsMx = 'es_MX',
  /** Estonian */
  Et = 'et',
  /** Basque */
  Eu = 'eu',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  FaAf = 'fa_AF',
  /** Fulah */
  Ff = 'ff',
  /** Finnish */
  Fi = 'fi',
  /** Faroese */
  Fo = 'fo',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  FrCa = 'fr_CA',
  /** Swiss French */
  FrCh = 'fr_CH',
  /** Western Frisian */
  Fy = 'fy',
  /** Irish */
  Ga = 'ga',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Galician */
  Gl = 'gl',
  /** Gujarati */
  Gu = 'gu',
  /** Manx */
  Gv = 'gv',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Croatian */
  Hr = 'hr',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hungarian */
  Hu = 'hu',
  /** Armenian */
  Hy = 'hy',
  /** Interlingua */
  Ia = 'ia',
  /** Indonesian */
  Id = 'id',
  /** Igbo */
  Ig = 'ig',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Icelandic */
  Is = 'is',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Georgian */
  Ka = 'ka',
  /** Kikuyu */
  Ki = 'ki',
  /** Kazakh */
  Kk = 'kk',
  /** Kalaallisut */
  Kl = 'kl',
  /** Khmer */
  Km = 'km',
  /** Kannada */
  Kn = 'kn',
  /** Korean */
  Ko = 'ko',
  /** Kashmiri */
  Ks = 'ks',
  /** Kurdish */
  Ku = 'ku',
  /** Cornish */
  Kw = 'kw',
  /** Kyrgyz */
  Ky = 'ky',
  /** Latin */
  La = 'la',
  /** Luxembourgish */
  Lb = 'lb',
  /** Ganda */
  Lg = 'lg',
  /** Lingala */
  Ln = 'ln',
  /** Lao */
  Lo = 'lo',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Latvian */
  Lv = 'lv',
  /** Malagasy */
  Mg = 'mg',
  /** Maori */
  Mi = 'mi',
  /** Macedonian */
  Mk = 'mk',
  /** Malayalam */
  Ml = 'ml',
  /** Mongolian */
  Mn = 'mn',
  /** Marathi */
  Mr = 'mr',
  /** Malay */
  Ms = 'ms',
  /** Maltese */
  Mt = 'mt',
  /** Burmese */
  My = 'my',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** North Ndebele */
  Nd = 'nd',
  /** Nepali */
  Ne = 'ne',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  NlBe = 'nl_BE',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Oromo */
  Om = 'om',
  /** Odia */
  Or = 'or',
  /** Ossetic */
  Os = 'os',
  /** Punjabi */
  Pa = 'pa',
  /** Polish */
  Pl = 'pl',
  /** Pashto */
  Ps = 'ps',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  PtBr = 'pt_BR',
  /** European Portuguese */
  PtPt = 'pt_PT',
  /** Quechua */
  Qu = 'qu',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  RoMd = 'ro_MD',
  /** Russian */
  Ru = 'ru',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Sanskrit */
  Sa = 'sa',
  /** Sindhi */
  Sd = 'sd',
  /** Northern Sami */
  Se = 'se',
  /** Sango */
  Sg = 'sg',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Samoan */
  Sm = 'sm',
  /** Shona */
  Sn = 'sn',
  /** Somali */
  So = 'so',
  /** Albanian */
  Sq = 'sq',
  /** Serbian */
  Sr = 'sr',
  /** Southern Sotho */
  St = 'st',
  /** Sundanese */
  Su = 'su',
  /** Swedish */
  Sv = 'sv',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  SwCd = 'sw_CD',
  /** Tamil */
  Ta = 'ta',
  /** Telugu */
  Te = 'te',
  /** Tajik */
  Tg = 'tg',
  /** Thai */
  Th = 'th',
  /** Tigrinya */
  Ti = 'ti',
  /** Turkmen */
  Tk = 'tk',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Tatar */
  Tt = 'tt',
  /** Uyghur */
  Ug = 'ug',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  ZhHans = 'zh_Hans',
  /** Traditional Chinese */
  ZhHant = 'zh_Hant',
  /** Zulu */
  Zu = 'zu'
}

export type LocaleStringCustomFieldConfig = CustomField & {
  readonly __typename?: 'LocaleStringCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly length: Maybe<Scalars['Int']['output']>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly pattern: Maybe<Scalars['String']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type LocaleTextCustomFieldConfig = CustomField & {
  readonly __typename?: 'LocaleTextCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type LocalizedString = {
  readonly __typename?: 'LocalizedString';
  readonly languageCode: LanguageCode;
  readonly value: Scalars['String']['output'];
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  readonly __typename?: 'MissingPasswordError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** Adds an item to the Order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
  readonly addItemToOrder: UpdateOrderItemsResult;
  /** Add a Payment to the Order */
  readonly addPaymentToOrder: AddPaymentToOrderResult;
  /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
  readonly adjustOrderLine: UpdateOrderItemsResult;
  /** Applies the given coupon code to the active Order */
  readonly applyCouponCode: ApplyCouponCodeResult;
  /** Authenticates the user using a named authentication strategy */
  readonly authenticate: AuthenticationResult;
  /** Create a new Customer Address */
  readonly createCustomerAddress: Address;
  /** Delete an existing Address */
  readonly deleteCustomerAddress: Success;
  /**
   * Authenticates the user using the native authentication strategy. This mutation is an alias for authenticate({ native: { ... }})
   *
   * The `rememberMe` option applies when using cookie-based sessions, and if `true` it will set the maxAge of the session cookie
   * to 1 year.
   */
  readonly login: NativeAuthenticationResult;
  /** End the current authenticated session */
  readonly logout: Success;
  /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
  readonly refreshCustomerVerification: RefreshCustomerVerificationResult;
  /**
   * Register a Customer account with the given credentials. There are three possible registration flows:
   *
   * _If `authOptions.requireVerification` is set to `true`:_
   *
   * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   *
   * _If `authOptions.requireVerification` is set to `false`:_
   *
   * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
   */
  readonly registerCustomerAccount: RegisterCustomerAccountResult;
  /** Remove all OrderLine from the Order */
  readonly removeAllOrderLines: RemoveOrderItemsResult;
  /** Removes the given coupon code from the active Order */
  readonly removeCouponCode: Maybe<Order>;
  /** Remove an OrderLine from the Order */
  readonly removeOrderLine: RemoveOrderItemsResult;
  /** Requests a password reset email to be sent */
  readonly requestPasswordReset: Maybe<RequestPasswordResetResult>;
  /**
   * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
   */
  readonly requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult;
  /** Resets a Customer's password based on the provided token */
  readonly resetPassword: ResetPasswordResult;
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  readonly setCustomerForOrder: SetCustomerForOrderResult;
  /** Sets the billing address for the active Order */
  readonly setOrderBillingAddress: ActiveOrderResult;
  /** Allows any custom fields to be set for the active Order */
  readonly setOrderCustomFields: ActiveOrderResult;
  /** Sets the shipping address for the active Order */
  readonly setOrderShippingAddress: ActiveOrderResult;
  /**
   * Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query.
   * An Order can have multiple shipping methods, in which case you can pass an array of ids. In this case,
   * you should configure a custom ShippingLineAssignmentStrategy in order to know which OrderLines each
   * shipping method will apply to.
   */
  readonly setOrderShippingMethod: SetOrderShippingMethodResult;
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  readonly transitionOrderToState: Maybe<TransitionOrderToStateResult>;
  /** Unsets the billing address for the active Order. Available since version 3.1.0 */
  readonly unsetOrderBillingAddress: ActiveOrderResult;
  /** Unsets the shipping address for the active Order. Available since version 3.1.0 */
  readonly unsetOrderShippingAddress: ActiveOrderResult;
  /** Update an existing Customer */
  readonly updateCustomer: Customer;
  /** Update an existing Address */
  readonly updateCustomerAddress: Address;
  /**
   * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
   */
  readonly updateCustomerEmailAddress: UpdateCustomerEmailAddressResult;
  /** Update the password of the active Customer */
  readonly updateCustomerPassword: UpdateCustomerPasswordResult;
  /**
   * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
   *
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
   * provided here.
   */
  readonly verifyCustomerAccount: VerifyCustomerAccountResult;
};


export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput;
};


export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String']['input'];
};


export type MutationAuthenticateArgs = {
  input: AuthenticationInput;
  rememberMe: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  rememberMe: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};


export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String']['input'];
};


export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput;
};


export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String']['input'];
};


export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID']['input'];
};


export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String']['input'];
};


export type MutationRequestUpdateCustomerEmailAddressArgs = {
  newEmailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput;
};


export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};


export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: ReadonlyArray<Scalars['ID']['input']>;
};


export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String']['input'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationVerifyCustomerAccountArgs = {
  password: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type NativeAuthInput = {
  readonly password: Scalars['String']['input'];
  readonly username: Scalars['String']['input'];
};

/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  readonly __typename?: 'NativeAuthStrategyError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export type NativeAuthenticationResult = CurrentUser | InvalidCredentialsError | NativeAuthStrategyError | NotVerifiedError;

/** Returned when attempting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  readonly __typename?: 'NegativeQuantityError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  readonly __typename?: 'NoActiveOrderError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export type Node = {
  readonly id: Scalars['ID']['output'];
};

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  readonly __typename?: 'NotVerifiedError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Operators for filtering on a list of Number fields */
export type NumberListOperators = {
  readonly inList: Scalars['Float']['input'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  readonly between: InputMaybe<NumberRange>;
  readonly eq: InputMaybe<Scalars['Float']['input']>;
  readonly gt: InputMaybe<Scalars['Float']['input']>;
  readonly gte: InputMaybe<Scalars['Float']['input']>;
  readonly isNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly lt: InputMaybe<Scalars['Float']['input']>;
  readonly lte: InputMaybe<Scalars['Float']['input']>;
};

export type NumberRange = {
  readonly end: Scalars['Float']['input'];
  readonly start: Scalars['Float']['input'];
};

export type Order = Node & {
  readonly __typename?: 'Order';
  /** An order is active as long as the payment process has not been completed */
  readonly active: Scalars['Boolean']['output'];
  readonly billingAddress: Maybe<OrderAddress>;
  /** A unique code for the Order */
  readonly code: Scalars['String']['output'];
  /** An array of all coupon codes applied to the Order */
  readonly couponCodes: ReadonlyArray<Scalars['String']['output']>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly currencyCode: CurrencyCode;
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly customer: Maybe<Customer>;
  readonly discounts: ReadonlyArray<Discount>;
  readonly fulfillments: Maybe<ReadonlyArray<Fulfillment>>;
  readonly history: HistoryEntryList;
  readonly id: Scalars['ID']['output'];
  readonly lines: ReadonlyArray<OrderLine>;
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  readonly orderPlacedAt: Maybe<Scalars['DateTime']['output']>;
  readonly payments: Maybe<ReadonlyArray<Payment>>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  readonly promotions: ReadonlyArray<Promotion>;
  readonly shipping: Scalars['Money']['output'];
  readonly shippingAddress: Maybe<OrderAddress>;
  readonly shippingLines: ReadonlyArray<ShippingLine>;
  readonly shippingWithTax: Scalars['Money']['output'];
  readonly state: Scalars['String']['output'];
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the items of each OrderLine.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  readonly subTotal: Scalars['Money']['output'];
  /** Same as subTotal, but inclusive of tax */
  readonly subTotalWithTax: Scalars['Money']['output'];
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  readonly surcharges: ReadonlyArray<Surcharge>;
  /** A summary of the taxes being applied to this Order */
  readonly taxSummary: ReadonlyArray<OrderTaxSummary>;
  /** Equal to subTotal plus shipping */
  readonly total: Scalars['Money']['output'];
  readonly totalQuantity: Scalars['Int']['output'];
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  readonly totalWithTax: Scalars['Money']['output'];
  readonly type: OrderType;
  readonly updatedAt: Scalars['DateTime']['output'];
};


export type OrderHistoryArgs = {
  options: InputMaybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
  readonly __typename?: 'OrderAddress';
  readonly city: Maybe<Scalars['String']['output']>;
  readonly company: Maybe<Scalars['String']['output']>;
  readonly country: Maybe<Scalars['String']['output']>;
  readonly countryCode: Maybe<Scalars['String']['output']>;
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly fullName: Maybe<Scalars['String']['output']>;
  readonly phoneNumber: Maybe<Scalars['String']['output']>;
  readonly postalCode: Maybe<Scalars['String']['output']>;
  readonly province: Maybe<Scalars['String']['output']>;
  readonly streetLine1: Maybe<Scalars['String']['output']>;
  readonly streetLine2: Maybe<Scalars['String']['output']>;
};

export type OrderFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<OrderFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<OrderFilterParameter>>;
  readonly active: InputMaybe<BooleanOperators>;
  readonly code: InputMaybe<StringOperators>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly currencyCode: InputMaybe<StringOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly orderPlacedAt: InputMaybe<DateOperators>;
  readonly shipping: InputMaybe<NumberOperators>;
  readonly shippingWithTax: InputMaybe<NumberOperators>;
  readonly state: InputMaybe<StringOperators>;
  readonly subTotal: InputMaybe<NumberOperators>;
  readonly subTotalWithTax: InputMaybe<NumberOperators>;
  readonly total: InputMaybe<NumberOperators>;
  readonly totalQuantity: InputMaybe<NumberOperators>;
  readonly totalWithTax: InputMaybe<NumberOperators>;
  readonly type: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

/** Returned when an order operation is rejected by an OrderInterceptor method. */
export type OrderInterceptorError = ErrorResult & {
  readonly __typename?: 'OrderInterceptorError';
  readonly errorCode: ErrorCode;
  readonly interceptorError: Scalars['String']['output'];
  readonly message: Scalars['String']['output'];
};

/** Returned when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  readonly __typename?: 'OrderLimitError';
  readonly errorCode: ErrorCode;
  readonly maxItems: Scalars['Int']['output'];
  readonly message: Scalars['String']['output'];
};

export type OrderLine = Node & {
  readonly __typename?: 'OrderLine';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  /** The price of the line including discounts, excluding tax */
  readonly discountedLinePrice: Scalars['Money']['output'];
  /** The price of the line including discounts and tax */
  readonly discountedLinePriceWithTax: Scalars['Money']['output'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  readonly discountedUnitPrice: Scalars['Money']['output'];
  /** The price of a single unit including discounts and tax */
  readonly discountedUnitPriceWithTax: Scalars['Money']['output'];
  readonly discounts: ReadonlyArray<Discount>;
  readonly featuredAsset: Maybe<Asset>;
  readonly fulfillmentLines: Maybe<ReadonlyArray<FulfillmentLine>>;
  readonly id: Scalars['ID']['output'];
  /** The total price of the line excluding tax and discounts. */
  readonly linePrice: Scalars['Money']['output'];
  /** The total price of the line including tax but excluding discounts. */
  readonly linePriceWithTax: Scalars['Money']['output'];
  /** The total tax on this line */
  readonly lineTax: Scalars['Money']['output'];
  readonly order: Order;
  /** The quantity at the time the Order was placed */
  readonly orderPlacedQuantity: Scalars['Int']['output'];
  readonly productVariant: ProductVariant;
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  readonly proratedLinePrice: Scalars['Money']['output'];
  /** The proratedLinePrice including tax */
  readonly proratedLinePriceWithTax: Scalars['Money']['output'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  readonly proratedUnitPrice: Scalars['Money']['output'];
  /** The proratedUnitPrice including tax */
  readonly proratedUnitPriceWithTax: Scalars['Money']['output'];
  /** The quantity of items purchased */
  readonly quantity: Scalars['Int']['output'];
  readonly taxLines: ReadonlyArray<TaxLine>;
  readonly taxRate: Scalars['Float']['output'];
  /** The price of a single unit, excluding tax and discounts */
  readonly unitPrice: Scalars['Money']['output'];
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  readonly unitPriceChangeSinceAdded: Scalars['Money']['output'];
  /** The price of a single unit, including tax but excluding discounts */
  readonly unitPriceWithTax: Scalars['Money']['output'];
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  readonly unitPriceWithTaxChangeSinceAdded: Scalars['Money']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = PaginatedList & {
  readonly __typename?: 'OrderList';
  readonly items: ReadonlyArray<Order>;
  readonly totalItems: Scalars['Int']['output'];
};

export type OrderListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<OrderFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<OrderSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export type OrderModificationError = ErrorResult & {
  readonly __typename?: 'OrderModificationError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export type OrderPaymentStateError = ErrorResult & {
  readonly __typename?: 'OrderPaymentStateError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export type OrderSortParameter = {
  readonly code: InputMaybe<SortOrder>;
  readonly createdAt: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly orderPlacedAt: InputMaybe<SortOrder>;
  readonly shipping: InputMaybe<SortOrder>;
  readonly shippingWithTax: InputMaybe<SortOrder>;
  readonly state: InputMaybe<SortOrder>;
  readonly subTotal: InputMaybe<SortOrder>;
  readonly subTotalWithTax: InputMaybe<SortOrder>;
  readonly total: InputMaybe<SortOrder>;
  readonly totalQuantity: InputMaybe<SortOrder>;
  readonly totalWithTax: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  readonly __typename?: 'OrderStateTransitionError';
  readonly errorCode: ErrorCode;
  readonly fromState: Scalars['String']['output'];
  readonly message: Scalars['String']['output'];
  readonly toState: Scalars['String']['output'];
  readonly transitionError: Scalars['String']['output'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  readonly __typename?: 'OrderTaxSummary';
  /** A description of this tax */
  readonly description: Scalars['String']['output'];
  /** The total net price of OrderLines to which this taxRate applies */
  readonly taxBase: Scalars['Money']['output'];
  /** The taxRate as a percentage */
  readonly taxRate: Scalars['Float']['output'];
  /** The total tax being applied to the Order at this taxRate */
  readonly taxTotal: Scalars['Money']['output'];
};

export enum OrderType {
  Aggregate = 'Aggregate',
  Regular = 'Regular',
  Seller = 'Seller'
}

export type PaginatedList = {
  readonly items: ReadonlyArray<Node>;
  readonly totalItems: Scalars['Int']['output'];
};

/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  readonly __typename?: 'PasswordAlreadySetError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  readonly __typename?: 'PasswordResetTokenExpiredError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  readonly __typename?: 'PasswordResetTokenInvalidError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export type PasswordValidationError = ErrorResult & {
  readonly __typename?: 'PasswordValidationError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
  readonly validationErrorMessage: Scalars['String']['output'];
};

export type Payment = Node & {
  readonly __typename?: 'Payment';
  readonly amount: Scalars['Money']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly errorMessage: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly metadata: Maybe<Scalars['JSON']['output']>;
  readonly method: Scalars['String']['output'];
  readonly refunds: ReadonlyArray<Refund>;
  readonly state: Scalars['String']['output'];
  readonly transactionId: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

/** Returned when a Payment is declined by the payment provider. */
export type PaymentDeclinedError = ErrorResult & {
  readonly __typename?: 'PaymentDeclinedError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
  readonly paymentErrorMessage: Scalars['String']['output'];
};

/** Returned when a Payment fails due to an error. */
export type PaymentFailedError = ErrorResult & {
  readonly __typename?: 'PaymentFailedError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
  readonly paymentErrorMessage: Scalars['String']['output'];
};

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  readonly metadata: Scalars['JSON']['input'];
  /** This field should correspond to the `code` property of a PaymentMethod. */
  readonly method: Scalars['String']['input'];
};

export type PaymentMethod = Node & {
  readonly __typename?: 'PaymentMethod';
  readonly checker: Maybe<ConfigurableOperation>;
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly enabled: Scalars['Boolean']['output'];
  readonly handler: ConfigurableOperation;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly translations: ReadonlyArray<PaymentMethodTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type PaymentMethodQuote = {
  readonly __typename?: 'PaymentMethodQuote';
  readonly code: Scalars['String']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly eligibilityMessage: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly isEligible: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
};

export type PaymentMethodTranslation = {
  readonly __typename?: 'PaymentMethodTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export enum Permission {
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to create Seller */
  CreateSeller = 'CreateSeller',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to create StockLocation */
  CreateStockLocation = 'CreateStockLocation',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to delete Seller */
  DeleteSeller = 'DeleteSeller',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to delete StockLocation */
  DeleteStockLocation = 'DeleteStockLocation',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to read Seller */
  ReadSeller = 'ReadSeller',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to read StockLocation */
  ReadStockLocation = 'ReadStockLocation',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to update Seller */
  UpdateSeller = 'UpdateSeller',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to update StockLocation */
  UpdateStockLocation = 'UpdateStockLocation',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone'
}

/** The price range where the result has more than one price */
export type PriceRange = {
  readonly __typename?: 'PriceRange';
  readonly max: Scalars['Money']['output'];
  readonly min: Scalars['Money']['output'];
};

export type Product = Node & {
  readonly __typename?: 'Product';
  readonly assets: ReadonlyArray<Asset>;
  readonly collections: ReadonlyArray<Collection>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly enabled: Scalars['Boolean']['output'];
  readonly facetValues: ReadonlyArray<FacetValue>;
  readonly featuredAsset: Maybe<Asset>;
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly optionGroups: ReadonlyArray<ProductOptionGroup>;
  readonly slug: Scalars['String']['output'];
  readonly translations: ReadonlyArray<ProductTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
  /** Returns a paginated, sortable, filterable list of ProductVariants */
  readonly variantList: ProductVariantList;
  /** Returns all ProductVariants */
  readonly variants: ReadonlyArray<ProductVariant>;
};


export type ProductVariantListArgs = {
  options: InputMaybe<ProductVariantListOptions>;
};

export type ProductFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<ProductFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<ProductFilterParameter>>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly description: InputMaybe<StringOperators>;
  readonly enabled: InputMaybe<BooleanOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly languageCode: InputMaybe<StringOperators>;
  readonly name: InputMaybe<StringOperators>;
  readonly slug: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type ProductList = PaginatedList & {
  readonly __typename?: 'ProductList';
  readonly items: ReadonlyArray<Product>;
  readonly totalItems: Scalars['Int']['output'];
};

export type ProductListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<ProductFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<ProductSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

export type ProductOption = Node & {
  readonly __typename?: 'ProductOption';
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly group: ProductOptionGroup;
  readonly groupId: Scalars['ID']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly translations: ReadonlyArray<ProductOptionTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionGroup = Node & {
  readonly __typename?: 'ProductOptionGroup';
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly options: ReadonlyArray<ProductOption>;
  readonly translations: ReadonlyArray<ProductOptionGroupTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionGroupTranslation = {
  readonly __typename?: 'ProductOptionGroupTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionTranslation = {
  readonly __typename?: 'ProductOptionTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ProductSortParameter = {
  readonly createdAt: InputMaybe<SortOrder>;
  readonly description: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly slug: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

export type ProductTranslation = {
  readonly __typename?: 'ProductTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly slug: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ProductVariant = Node & {
  readonly __typename?: 'ProductVariant';
  readonly assets: ReadonlyArray<Asset>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly currencyCode: CurrencyCode;
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly facetValues: ReadonlyArray<FacetValue>;
  readonly featuredAsset: Maybe<Asset>;
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly options: ReadonlyArray<ProductOption>;
  readonly price: Scalars['Money']['output'];
  readonly priceWithTax: Scalars['Money']['output'];
  readonly product: Product;
  readonly productId: Scalars['ID']['output'];
  readonly sku: Scalars['String']['output'];
  readonly stockLevel: Scalars['String']['output'];
  readonly taxCategory: TaxCategory;
  readonly taxRateApplied: TaxRate;
  readonly translations: ReadonlyArray<ProductVariantTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ProductVariantFilterParameter = {
  readonly _and: InputMaybe<ReadonlyArray<ProductVariantFilterParameter>>;
  readonly _or: InputMaybe<ReadonlyArray<ProductVariantFilterParameter>>;
  readonly createdAt: InputMaybe<DateOperators>;
  readonly currencyCode: InputMaybe<StringOperators>;
  readonly id: InputMaybe<IdOperators>;
  readonly languageCode: InputMaybe<StringOperators>;
  readonly name: InputMaybe<StringOperators>;
  readonly price: InputMaybe<NumberOperators>;
  readonly priceWithTax: InputMaybe<NumberOperators>;
  readonly productId: InputMaybe<IdOperators>;
  readonly sku: InputMaybe<StringOperators>;
  readonly stockLevel: InputMaybe<StringOperators>;
  readonly updatedAt: InputMaybe<DateOperators>;
};

export type ProductVariantList = PaginatedList & {
  readonly __typename?: 'ProductVariantList';
  readonly items: ReadonlyArray<ProductVariant>;
  readonly totalItems: Scalars['Int']['output'];
};

export type ProductVariantListOptions = {
  /** Allows the results to be filtered */
  readonly filter: InputMaybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  readonly filterOperator: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  readonly sort: InputMaybe<ProductVariantSortParameter>;
  /** Takes n results, for use in pagination */
  readonly take: InputMaybe<Scalars['Int']['input']>;
};

export type ProductVariantSortParameter = {
  readonly createdAt: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly price: InputMaybe<SortOrder>;
  readonly priceWithTax: InputMaybe<SortOrder>;
  readonly productId: InputMaybe<SortOrder>;
  readonly sku: InputMaybe<SortOrder>;
  readonly stockLevel: InputMaybe<SortOrder>;
  readonly updatedAt: InputMaybe<SortOrder>;
};

export type ProductVariantTranslation = {
  readonly __typename?: 'ProductVariantTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type Promotion = Node & {
  readonly __typename?: 'Promotion';
  readonly actions: ReadonlyArray<ConfigurableOperation>;
  readonly conditions: ReadonlyArray<ConfigurableOperation>;
  readonly couponCode: Maybe<Scalars['String']['output']>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly enabled: Scalars['Boolean']['output'];
  readonly endsAt: Maybe<Scalars['DateTime']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly perCustomerUsageLimit: Maybe<Scalars['Int']['output']>;
  readonly startsAt: Maybe<Scalars['DateTime']['output']>;
  readonly translations: ReadonlyArray<PromotionTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
  readonly usageLimit: Maybe<Scalars['Int']['output']>;
};

export type PromotionList = PaginatedList & {
  readonly __typename?: 'PromotionList';
  readonly items: ReadonlyArray<Promotion>;
  readonly totalItems: Scalars['Int']['output'];
};

export type PromotionTranslation = {
  readonly __typename?: 'PromotionTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type Province = Node & Region & {
  readonly __typename?: 'Province';
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly enabled: Scalars['Boolean']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly parent: Maybe<Region>;
  readonly parentId: Maybe<Scalars['ID']['output']>;
  readonly translations: ReadonlyArray<RegionTranslation>;
  readonly type: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ProvinceList = PaginatedList & {
  readonly __typename?: 'ProvinceList';
  readonly items: ReadonlyArray<Province>;
  readonly totalItems: Scalars['Int']['output'];
};

export type PublicPaymentMethod = {
  readonly __typename?: 'PublicPaymentMethod';
  readonly code: Scalars['String']['output'];
  readonly description: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly translations: ReadonlyArray<PaymentMethodTranslation>;
};

export type PublicShippingMethod = {
  readonly __typename?: 'PublicShippingMethod';
  readonly code: Scalars['String']['output'];
  readonly description: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly translations: ReadonlyArray<ShippingMethodTranslation>;
};

export type Query = {
  readonly __typename?: 'Query';
  /** The active Channel */
  readonly activeChannel: Channel;
  /** The active Customer */
  readonly activeCustomer: Maybe<Customer>;
  /**
   * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
   */
  readonly activeOrder: Maybe<Order>;
  /** Get active payment methods */
  readonly activePaymentMethods: ReadonlyArray<Maybe<PublicPaymentMethod>>;
  /** Get active shipping methods */
  readonly activeShippingMethods: ReadonlyArray<Maybe<PublicShippingMethod>>;
  /** An array of supported Countries */
  readonly availableCountries: ReadonlyArray<Country>;
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  readonly collection: Maybe<Collection>;
  /** A list of Collections available to the shop */
  readonly collections: CollectionList;
  /** Returns a list of payment methods and their eligibility based on the current active Order */
  readonly eligiblePaymentMethods: ReadonlyArray<PaymentMethodQuote>;
  /** Returns a list of eligible shipping methods based on the current active Order */
  readonly eligibleShippingMethods: ReadonlyArray<ShippingMethodQuote>;
  /** Returns a Facet by its id */
  readonly facet: Maybe<Facet>;
  /** A list of Facets available to the shop */
  readonly facets: FacetList;
  /** Returns information about the current authenticated User */
  readonly me: Maybe<CurrentUser>;
  /** Returns the possible next states that the activeOrder can transition to */
  readonly nextOrderStates: ReadonlyArray<Scalars['String']['output']>;
  /**
   * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
   */
  readonly order: Maybe<Order>;
  /**
   * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
   */
  readonly orderByCode: Maybe<Order>;
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  readonly product: Maybe<Product>;
  /** Get a list of Products */
  readonly products: ProductList;
  /** Search Products based on the criteria set by the `SearchInput` */
  readonly search: SearchResponse;
};


export type QueryCollectionArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  options: InputMaybe<CollectionListOptions>;
};


export type QueryFacetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFacetsArgs = {
  options: InputMaybe<FacetListOptions>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  options: InputMaybe<ProductListOptions>;
};


export type QuerySearchArgs = {
  input: SearchInput;
};

export type RefreshCustomerVerificationResult = NativeAuthStrategyError | Success;

export type Refund = Node & {
  readonly __typename?: 'Refund';
  readonly adjustment: Scalars['Money']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly items: Scalars['Money']['output'];
  readonly lines: ReadonlyArray<RefundLine>;
  readonly metadata: Maybe<Scalars['JSON']['output']>;
  readonly method: Maybe<Scalars['String']['output']>;
  readonly paymentId: Scalars['ID']['output'];
  readonly reason: Maybe<Scalars['String']['output']>;
  readonly shipping: Scalars['Money']['output'];
  readonly state: Scalars['String']['output'];
  readonly total: Scalars['Money']['output'];
  readonly transactionId: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type RefundLine = {
  readonly __typename?: 'RefundLine';
  readonly orderLine: OrderLine;
  readonly orderLineId: Scalars['ID']['output'];
  readonly quantity: Scalars['Int']['output'];
  readonly refund: Refund;
  readonly refundId: Scalars['ID']['output'];
};

export type Region = {
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly enabled: Scalars['Boolean']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly parent: Maybe<Region>;
  readonly parentId: Maybe<Scalars['ID']['output']>;
  readonly translations: ReadonlyArray<RegionTranslation>;
  readonly type: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type RegionTranslation = {
  readonly __typename?: 'RegionTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type RegisterCustomerAccountResult = MissingPasswordError | NativeAuthStrategyError | PasswordValidationError | Success;

export type RegisterCustomerInput = {
  readonly emailAddress: Scalars['String']['input'];
  readonly firstName: InputMaybe<Scalars['String']['input']>;
  readonly lastName: InputMaybe<Scalars['String']['input']>;
  readonly password: InputMaybe<Scalars['String']['input']>;
  readonly phoneNumber: InputMaybe<Scalars['String']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type RelationCustomFieldConfig = CustomField & {
  readonly __typename?: 'RelationCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly entity: Scalars['String']['output'];
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly scalarFields: ReadonlyArray<Scalars['String']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type RemoveOrderItemsResult = Order | OrderInterceptorError | OrderModificationError;

export type RequestPasswordResetResult = NativeAuthStrategyError | Success;

export type RequestUpdateCustomerEmailAddressResult = EmailAddressConflictError | InvalidCredentialsError | NativeAuthStrategyError | Success;

export type ResetPasswordResult = CurrentUser | NativeAuthStrategyError | NotVerifiedError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | PasswordValidationError;

export type Role = Node & {
  readonly __typename?: 'Role';
  readonly channels: ReadonlyArray<Channel>;
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly permissions: ReadonlyArray<Permission>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type RoleList = PaginatedList & {
  readonly __typename?: 'RoleList';
  readonly items: ReadonlyArray<Role>;
  readonly totalItems: Scalars['Int']['output'];
};

export type SearchInput = {
  readonly collectionId: InputMaybe<Scalars['ID']['input']>;
  readonly collectionSlug: InputMaybe<Scalars['String']['input']>;
  readonly facetValueFilters: InputMaybe<ReadonlyArray<FacetValueFilterInput>>;
  readonly groupByProduct: InputMaybe<Scalars['Boolean']['input']>;
  readonly inStock: InputMaybe<Scalars['Boolean']['input']>;
  readonly skip: InputMaybe<Scalars['Int']['input']>;
  readonly sort: InputMaybe<SearchResultSortParameter>;
  readonly take: InputMaybe<Scalars['Int']['input']>;
  readonly term: InputMaybe<Scalars['String']['input']>;
};

export type SearchReindexResponse = {
  readonly __typename?: 'SearchReindexResponse';
  readonly success: Scalars['Boolean']['output'];
};

export type SearchResponse = {
  readonly __typename?: 'SearchResponse';
  readonly collections: ReadonlyArray<CollectionResult>;
  readonly facetValues: ReadonlyArray<FacetValueResult>;
  readonly items: ReadonlyArray<SearchResult>;
  readonly totalItems: Scalars['Int']['output'];
};

export type SearchResult = {
  readonly __typename?: 'SearchResult';
  /** An array of ids of the Collections in which this result appears */
  readonly collectionIds: ReadonlyArray<Scalars['ID']['output']>;
  readonly currencyCode: CurrencyCode;
  readonly description: Scalars['String']['output'];
  readonly facetIds: ReadonlyArray<Scalars['ID']['output']>;
  readonly facetValueIds: ReadonlyArray<Scalars['ID']['output']>;
  readonly inStock: Scalars['Boolean']['output'];
  readonly price: SearchResultPrice;
  readonly priceWithTax: SearchResultPrice;
  readonly productAsset: Maybe<SearchResultAsset>;
  readonly productId: Scalars['ID']['output'];
  readonly productName: Scalars['String']['output'];
  readonly productVariantAsset: Maybe<SearchResultAsset>;
  readonly productVariantId: Scalars['ID']['output'];
  readonly productVariantName: Scalars['String']['output'];
  /** A relevance score for the result. Differs between database implementations */
  readonly score: Scalars['Float']['output'];
  readonly sku: Scalars['String']['output'];
  readonly slug: Scalars['String']['output'];
};

export type SearchResultAsset = {
  readonly __typename?: 'SearchResultAsset';
  readonly focalPoint: Maybe<Coordinate>;
  readonly id: Scalars['ID']['output'];
  readonly preview: Scalars['String']['output'];
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  readonly name: InputMaybe<SortOrder>;
  readonly price: InputMaybe<SortOrder>;
};

export type Seller = Node & {
  readonly __typename?: 'Seller';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type SetCustomerForOrderResult = AlreadyLoggedInError | EmailAddressConflictError | GuestCheckoutError | NoActiveOrderError | Order;

export type SetOrderShippingMethodResult = IneligibleShippingMethodError | NoActiveOrderError | Order | OrderModificationError;

export type ShippingLine = {
  readonly __typename?: 'ShippingLine';
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly discountedPrice: Scalars['Money']['output'];
  readonly discountedPriceWithTax: Scalars['Money']['output'];
  readonly discounts: ReadonlyArray<Discount>;
  readonly id: Scalars['ID']['output'];
  readonly price: Scalars['Money']['output'];
  readonly priceWithTax: Scalars['Money']['output'];
  readonly shippingMethod: ShippingMethod;
};

export type ShippingMethod = Node & {
  readonly __typename?: 'ShippingMethod';
  readonly calculator: ConfigurableOperation;
  readonly checker: ConfigurableOperation;
  readonly code: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly fulfillmentHandlerCode: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly translations: ReadonlyArray<ShippingMethodTranslation>;
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type ShippingMethodList = PaginatedList & {
  readonly __typename?: 'ShippingMethodList';
  readonly items: ReadonlyArray<ShippingMethod>;
  readonly totalItems: Scalars['Int']['output'];
};

export type ShippingMethodQuote = {
  readonly __typename?: 'ShippingMethodQuote';
  readonly code: Scalars['String']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  readonly metadata: Maybe<Scalars['JSON']['output']>;
  readonly name: Scalars['String']['output'];
  readonly price: Scalars['Money']['output'];
  readonly priceWithTax: Scalars['Money']['output'];
};

export type ShippingMethodTranslation = {
  readonly __typename?: 'ShippingMethodTranslation';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly languageCode: LanguageCode;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

/** The price value where the result has a single price */
export type SinglePrice = {
  readonly __typename?: 'SinglePrice';
  readonly value: Scalars['Money']['output'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringCustomFieldConfig = CustomField & {
  readonly __typename?: 'StringCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly length: Maybe<Scalars['Int']['output']>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly options: Maybe<ReadonlyArray<StringFieldOption>>;
  readonly pattern: Maybe<Scalars['String']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type StringFieldOption = {
  readonly __typename?: 'StringFieldOption';
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly value: Scalars['String']['output'];
};

/** Operators for filtering on a list of String fields */
export type StringListOperators = {
  readonly inList: Scalars['String']['input'];
};

/** Operators for filtering on a String field */
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

export type StringStructFieldConfig = StructField & {
  readonly __typename?: 'StringStructFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly length: Maybe<Scalars['Int']['output']>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly options: Maybe<ReadonlyArray<StringFieldOption>>;
  readonly pattern: Maybe<Scalars['String']['output']>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type StructCustomFieldConfig = CustomField & {
  readonly __typename?: 'StructCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly fields: ReadonlyArray<StructFieldConfig>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type StructField = {
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Maybe<Scalars['Boolean']['output']>;
  readonly name: Scalars['String']['output'];
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type StructFieldConfig = BooleanStructFieldConfig | DateTimeStructFieldConfig | FloatStructFieldConfig | IntStructFieldConfig | StringStructFieldConfig | TextStructFieldConfig;

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  readonly __typename?: 'Success';
  readonly success: Scalars['Boolean']['output'];
};

export type Surcharge = Node & {
  readonly __typename?: 'Surcharge';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly price: Scalars['Money']['output'];
  readonly priceWithTax: Scalars['Money']['output'];
  readonly sku: Maybe<Scalars['String']['output']>;
  readonly taxLines: ReadonlyArray<TaxLine>;
  readonly taxRate: Scalars['Float']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type Tag = Node & {
  readonly __typename?: 'Tag';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
  readonly value: Scalars['String']['output'];
};

export type TagList = PaginatedList & {
  readonly __typename?: 'TagList';
  readonly items: ReadonlyArray<Tag>;
  readonly totalItems: Scalars['Int']['output'];
};

export type TaxCategory = Node & {
  readonly __typename?: 'TaxCategory';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly isDefault: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type TaxLine = {
  readonly __typename?: 'TaxLine';
  readonly description: Scalars['String']['output'];
  readonly taxRate: Scalars['Float']['output'];
};

export type TaxRate = Node & {
  readonly __typename?: 'TaxRate';
  readonly category: TaxCategory;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly customerGroup: Maybe<CustomerGroup>;
  readonly enabled: Scalars['Boolean']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
  readonly value: Scalars['Float']['output'];
  readonly zone: Zone;
};

export type TaxRateList = PaginatedList & {
  readonly __typename?: 'TaxRateList';
  readonly items: ReadonlyArray<TaxRate>;
  readonly totalItems: Scalars['Int']['output'];
};

export type TextCustomFieldConfig = CustomField & {
  readonly __typename?: 'TextCustomFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly internal: Maybe<Scalars['Boolean']['output']>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly nullable: Maybe<Scalars['Boolean']['output']>;
  readonly readonly: Maybe<Scalars['Boolean']['output']>;
  readonly requiresPermission: Maybe<ReadonlyArray<Permission>>;
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type TextStructFieldConfig = StructField & {
  readonly __typename?: 'TextStructFieldConfig';
  readonly description: Maybe<ReadonlyArray<LocalizedString>>;
  readonly label: Maybe<ReadonlyArray<LocalizedString>>;
  readonly list: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly type: Scalars['String']['output'];
  readonly ui: Maybe<Scalars['JSON']['output']>;
};

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

/**
 * Input used to update an Address.
 *
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export type UpdateAddressInput = {
  readonly city: InputMaybe<Scalars['String']['input']>;
  readonly company: InputMaybe<Scalars['String']['input']>;
  readonly countryCode: InputMaybe<Scalars['String']['input']>;
  readonly customFields: InputMaybe<Scalars['JSON']['input']>;
  readonly defaultBillingAddress: InputMaybe<Scalars['Boolean']['input']>;
  readonly defaultShippingAddress: InputMaybe<Scalars['Boolean']['input']>;
  readonly fullName: InputMaybe<Scalars['String']['input']>;
  readonly id: Scalars['ID']['input'];
  readonly phoneNumber: InputMaybe<Scalars['String']['input']>;
  readonly postalCode: InputMaybe<Scalars['String']['input']>;
  readonly province: InputMaybe<Scalars['String']['input']>;
  readonly streetLine1: InputMaybe<Scalars['String']['input']>;
  readonly streetLine2: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerEmailAddressResult = IdentifierChangeTokenExpiredError | IdentifierChangeTokenInvalidError | NativeAuthStrategyError | Success;

export type UpdateCustomerInput = {
  readonly customFields: InputMaybe<Scalars['JSON']['input']>;
  readonly firstName: InputMaybe<Scalars['String']['input']>;
  readonly lastName: InputMaybe<Scalars['String']['input']>;
  readonly phoneNumber: InputMaybe<Scalars['String']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerPasswordResult = InvalidCredentialsError | NativeAuthStrategyError | PasswordValidationError | Success;

export type UpdateOrderInput = {
  readonly customFields: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateOrderItemsResult = InsufficientStockError | NegativeQuantityError | Order | OrderInterceptorError | OrderLimitError | OrderModificationError;

export type User = Node & {
  readonly __typename?: 'User';
  readonly authenticationMethods: ReadonlyArray<AuthenticationMethod>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly identifier: Scalars['String']['output'];
  readonly lastLogin: Maybe<Scalars['DateTime']['output']>;
  readonly roles: ReadonlyArray<Role>;
  readonly updatedAt: Scalars['DateTime']['output'];
  readonly verified: Scalars['Boolean']['output'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  readonly __typename?: 'VerificationTokenExpiredError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  readonly __typename?: 'VerificationTokenInvalidError';
  readonly errorCode: ErrorCode;
  readonly message: Scalars['String']['output'];
};

export type VerifyCustomerAccountResult = CurrentUser | MissingPasswordError | NativeAuthStrategyError | PasswordAlreadySetError | PasswordValidationError | VerificationTokenExpiredError | VerificationTokenInvalidError;

export type Zone = Node & {
  readonly __typename?: 'Zone';
  readonly createdAt: Scalars['DateTime']['output'];
  readonly customFields: Maybe<Scalars['JSON']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly members: ReadonlyArray<Region>;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductQuery = { readonly __typename?: 'Query', readonly product: { readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly slug: string, readonly description: string, readonly featuredAsset: { readonly __typename?: 'Asset', readonly id: string, readonly preview: string } | null, readonly variants: ReadonlyArray<{ readonly __typename?: 'ProductVariant', readonly id: string, readonly name: string, readonly price: any, readonly currencyCode: CurrencyCode, readonly priceWithTax: any, readonly sku: string, readonly stockLevel: string }> } | null };

export type GetProductsQueryVariables = Exact<{
  options: InputMaybe<ProductListOptions>;
}>;


export type GetProductsQuery = { readonly __typename?: 'Query', readonly products: { readonly __typename?: 'ProductList', readonly totalItems: number, readonly items: ReadonlyArray<{ readonly __typename?: 'Product', readonly id: string, readonly name: string, readonly slug: string, readonly description: string, readonly featuredAsset: { readonly __typename?: 'Asset', readonly id: string, readonly preview: string } | null, readonly variants: ReadonlyArray<{ readonly __typename?: 'ProductVariant', readonly id: string, readonly name: string, readonly price: any, readonly currencyCode: CurrencyCode, readonly priceWithTax: any, readonly sku: string }> }> } };

export type SearchProductsQueryVariables = Exact<{
  input: SearchInput;
}>;


export type SearchProductsQuery = { readonly __typename?: 'Query', readonly search: { readonly __typename?: 'SearchResponse', readonly totalItems: number, readonly items: ReadonlyArray<{ readonly __typename?: 'SearchResult', readonly productId: string, readonly slug: string, readonly productName: string, readonly description: string, readonly priceWithTax: { readonly __typename?: 'PriceRange', readonly min: any, readonly max: any } | { readonly __typename?: 'SinglePrice' }, readonly productAsset: { readonly __typename?: 'SearchResultAsset', readonly id: string, readonly preview: string, readonly focalPoint: { readonly __typename?: 'Coordinate', readonly x: number, readonly y: number } | null } | null }>, readonly facetValues: ReadonlyArray<{ readonly __typename?: 'FacetValueResult', readonly count: number, readonly facetValue: { readonly __typename?: 'FacetValue', readonly id: string, readonly name: string, readonly facet: { readonly __typename?: 'Facet', readonly id: string, readonly name: string } } }> } };

export type GetCollectionQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCollectionQuery = { readonly __typename?: 'Query', readonly collection: { readonly __typename?: 'Collection', readonly id: string, readonly name: string, readonly slug: string, readonly description: string, readonly featuredAsset: { readonly __typename?: 'Asset', readonly id: string, readonly preview: string } | null, readonly breadcrumbs: ReadonlyArray<{ readonly __typename?: 'CollectionBreadcrumb', readonly id: string, readonly slug: string, readonly name: string }>, readonly children: ReadonlyArray<{ readonly __typename?: 'Collection', readonly id: string, readonly slug: string, readonly name: string, readonly featuredAsset: { readonly __typename?: 'Asset', readonly id: string, readonly preview: string } | null }> | null } | null };
