export interface Page<T> {
    content: T[];
    pageable: any;  // Vous pouvez affiner le type selon vos besoins
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
  }
  