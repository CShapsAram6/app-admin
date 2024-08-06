interface QLUser {
    id: number;
    fullName?: string;
    email?:string;
    userName?: string;
    address?:string;
    phone?:string;
    dateCreate?:string;
    status:boolean;
    linkAvatar?:string;
  }
  export{QLUser};