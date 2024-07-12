export interface Group {
  id: number;
  name: string;
  parentGroupId: number | null;
  members: Member[];
  subgroups: Group[];
}

export interface Member {
  groupId: any;
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  createdAt: Date;
  updatedAt: Date;
}