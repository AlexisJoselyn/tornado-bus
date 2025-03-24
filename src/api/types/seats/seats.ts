// src/types/index.ts
export interface Seat {
    id: number;
    row: number;
    column: number;
    seat: number;
    idIcon: number;
    icon: string;
    group: number;
    color: string | null;
    officeColor: string;
    colorGroup: string;
    idStatus: number;
    status: string;
    ticketTypeId: number;
    ticketSessionId: number | null;
    colorSelect: string;
    ticketId: number | null;
    ticketPartialId: number | null;
    finalStop: string;
    isEmpty: number;
    countTicket: number;
    idsTicket: number[] | null;
    idRoute: number | null;
    itineraryId: number | null;
    idDisability: number | null;
    idDisabilityPartial: number;
    idTicketsDisability: number[] | null;
  }
  
export interface SeatLevel {
    nivel: number;
    rows: number;
    columns: number;
    seats: Seat[];
  }
  
export interface SeatResponse {
    statusCode: number;
    message: string;
    data: SeatLevel[];
    meta: Record<string, unknown>;
    success: unknown[];
    fail: unknown[];
    log: Record<string, unknown>;
  }