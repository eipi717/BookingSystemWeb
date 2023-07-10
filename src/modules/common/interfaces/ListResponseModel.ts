export interface ListResponseModel<T> {
    numberOfPages: number,
    totalResponse: number,
    data: T[]
}