export interface SentListItem {
  id: number;
  to: string;
  content: string; // 发送短信的内容
  kinds: number; // 短信类型1营销2报警3验证码
  sendTime: number; // 发送时间
  status: number; // 0发送成功1失败
}
