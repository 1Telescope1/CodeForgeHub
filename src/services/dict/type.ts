interface Dict {
  id: number;
  name: string;
  content: string;
  reviewStatus: number;
  reviewMessage?: string;
  userId: number;
  createTime: Date;
  updateTime: Date;
}
