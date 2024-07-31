
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
interface getblogupdate{
  id:number;
  header: string;
  content: string;  
  images?: imageDtos[];

}
interface updateblog{
  id:number;
  header: string;
  content: string;  
  ImageDelete?:number[];
  images?: File[];
}
interface imageDtos {
  id: number;
  link: string;
  isActive: boolean;
}


// up git

export { blogDto, createblog,updateblog,getblogupdate };
