export interface PassengerType {
    id: number;
    name: string;
    default: boolean;
    ageMin: number;
    ageMax: number;
  }

export interface PassengerTypeResponse {
    statusCode: number,
    data: PassengerType[]
    meta: object,
    success: object,
    fail: object,
    log: object
}
