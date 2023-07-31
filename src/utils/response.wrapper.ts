export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const SuccessResponse = <T>(
  data: T,
  message: string,
  success = true,
): ApiResponse<T> => {
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
): ApiResponse<T> => {
  return {
    success,
    message,
    data,
  };
};
