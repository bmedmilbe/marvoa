export interface Member {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  phone: number;
}
export interface GroupMember {
  id: number;
  member?: Member;
  order: number;
  phone: string | number;
}
