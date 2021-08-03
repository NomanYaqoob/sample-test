
export interface Item {
  id: number;
  name: string;
  categories: Array<ItemCategory>;
  default: DefaultItem,
  slug: string;
  variations: Array<DefaultItem>;
}


export interface ItemCategory {
  id: number;
  name: string;
  type: string;
  slug: string;
  sortValue: number;
}

export interface DefaultItem {
  id: number;
  name: string;
  description: string;
  price: string;
  sale_price: string;
  regular_price: string;
  on_sale: boolean;
  purchasable: boolean;
  slug: string;
  variation: string;
  stock_quantity: number;
  rewards_point: number;
  replenishment_subscribed_units: number;
  prescription_required: boolean;
  age_verification: boolean;
  image: DefaultItemImage;
}

export interface DefaultItemImage {
  src: string;
  name: string;
  alt: string;
}

export interface PagingConfig {
  page: number;
  per_page: number;
}
