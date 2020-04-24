export interface SassSendItem {
  id: number;
  title: string;
  content: string;
  kinds: number; // 短信类型1营销2报警3验证码
  sendTime: number; // 发送时间
  count: number; // 数量
  status: number; // 1待发送2已发送
  sendType: number; // 0已发送1立即发送2定时发送
}
