import customFetch from "../../utils/axios";

type Props = {
  filter_type: string;
  product_id: any;
};

export async function get_avg_review({ filter_type, product_id }: Props) {
  let url = `/${filter_type}/${product_id}/reviews/average_rating/`;
  const response = await customFetch.get(url);
  return response;
}
