
interface blogDto {
  id: number;
  header: string;
  content: string;
  datePush: string;
  images: string;
  accountId: number;
  imageacc:string;
  nameacc:string;
}
interface createblog {
  header: String;
  content: String;
  // chuaw theem accontID
  images: File[];
  accountId: number;
}
interface getblogupdate{
  id:number;
  header: string;
  content: string;  
  images?: imageDtos[];
  imageacc:string;
  nameacc:string;  
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

interface pageBlogDtos {
  page: number;
  name: string;
}


// up git

export { blogDto, createblog,updateblog,getblogupdate,pageBlogDtos };
