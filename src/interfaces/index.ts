interface ValidationError {
  target?: object;
  property: string;
  value?: any;
  constraints?: {
    [type: string]: string;
  };
  children?: ValidationError[];
  contexts?: {
  };
}

export interface UpdateInfoRequest {
  name: string;
}

interface BaseResponseInterface {
  success: boolean;
  data?: any;
  errors?: ValidationError[];
}

interface BaseResponseSuccess extends BaseResponseInterface {
  success: true;
  data: any;
}

interface BaseResponseError extends BaseResponseInterface {
  success: false;
  errors: ValidationError[];
}

export type BaseResponse = BaseResponseSuccess | BaseResponseError;
