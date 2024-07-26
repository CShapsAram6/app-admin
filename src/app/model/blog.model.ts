interface blogDto {
  id: number;
  header: string;
  content: string;
  datePush: string;
  images: string;
}
interface createblog {
  header: String;
  content: String;
  // chuaw theem accontID
  images: File[];
}
// up git

export { blogDto, createblog };
