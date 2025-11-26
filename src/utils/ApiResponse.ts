interface ApiResponseMeta {
  total?: number;
  page?: number;
  limit?: number;
}

export class ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
  status:number;
  meta: ApiResponseMeta | null;

  constructor(statusCode: number, data: T | null, message = "success", meta: ApiResponseMeta | null = null) {
    this.statusCode = statusCode;
    this.status = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
