// 基础通用类型
export interface RequestBody {
  [key: string]: string | number | boolean | null | RequestBody | number[][] | number[] | string[] | RequestBody[];
}

export interface ChildrenTypes {
  children?: React.ReactNode;
}