export interface Group {
    id: number;
    name: string;
    parentGroupId?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
  }