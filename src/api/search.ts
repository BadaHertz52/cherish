import { httpClient } from './index';

export type SearchResponse = {
  content: [
    {
      id: string;
      name: string;
      brand: string;
      description: string;
      price: number;
      imgUrl: string;
    },
  ];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  last: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export const searchByKeword = async (keyword: string) => {
  const { data } = await httpClient.get<SearchResponse>(`/public/item/search`, {
    params: { keyword },
  });

  return data.content;
};
