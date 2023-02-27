type Result<T> = {
  error: any;
  data: T;
};

export async function asyncAction<T>(promise: Promise<T>): Promise<Result<T>> {
  return await Promise.resolve(promise)
    .then(
      (data): Result<T> => ({
        error: null,
        data,
      })
    )
    .catch((error) => ({
      error,
      data: null,
    }));
}
