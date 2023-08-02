export interface CustomApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const SuccessResponse = <T>(
  data: T,
  message: string,
  success = true,
): CustomApiResponse<T> => {
  return {
    success,
    message,
    data,
  };
};

export const FailResponse = <T>(
  data: T,
  message: string,
  success = false,
): CustomApiResponse<T> => {
  return {
    success,
    message,
    data,
  };
};
