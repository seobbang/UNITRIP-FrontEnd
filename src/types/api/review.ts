export interface ReviewResponse {
  id: number;
  place: number;
  writer: number;
  rate: number;
  description: string;
  convenience: string[];
  imgUrls: string[];
  date: string;
  USER: {
    name: string;
  };
}
