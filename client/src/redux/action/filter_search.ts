import customFetch from "../../utils/axios";

type Props = {
  searchterm: string;
};

export async function ProductSearch({ searchterm }: Props) {
  const url = `products/search-results/?query=${searchterm}`;

  const response = await customFetch.get(url);
  return response;
}
