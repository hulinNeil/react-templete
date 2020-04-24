export interface RowListItem {
  id: number;
  title: string;
  content: string; // 短信模板内容
  business: number; // 所属业务方1,2,3代表
  system: string; // 所属系统
  status: number; // 1启用2禁用
  kinds: number; // 内容分类1营销2报警3,验证码
  editTime: number; // 最后编辑时间
  sendtime?: number; // 最近发送时间
  rule?: number; // 发送规则1定时发送2立即发送
}

export interface TableListItem {
  id: number;
  title: string;
  content: string; // 短信模板内容
  business: number; // 所属业务方1,2,3代表
  system: string[]; // 所属系统
  status: number; // 1启用2禁用
  kinds: number; // 内容分类1营销2报警3,验证码
  editTime: number; // 最后编辑时间
  sendtime?: number; // 最近发送时间
  rule?: number; // 发送规则1定时发送2立即发送
}
