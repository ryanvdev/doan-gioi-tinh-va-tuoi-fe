export type TApiResponseWithoutPromise<T> =
    | {
          status: 'successfully';
          data: T;
          message?: string;
      }
    | {
          status: 'failure';
          message: string;
      };

type TApiResponse<T> = Promise<TApiResponseWithoutPromise<T>>;

export default TApiResponse;
