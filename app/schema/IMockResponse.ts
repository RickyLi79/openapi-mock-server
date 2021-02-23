export interface IMockResponse {
  status: number;
  headers: { [field: string]: string };

  contentType?:string;
  content?: any;
}
